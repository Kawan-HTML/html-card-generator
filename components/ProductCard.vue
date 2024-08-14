<template>
  <div class="flex items-center mt-2">
    <button
      class="p-1 shrink-0 focus:outline-none drag cursor-move"
      tabindex="-1"
    >
      <div
        class="w-6 h-6"
        v-html="require(`~/assets/icons/drag.svg?include`)"
      ></div>
    </button>
    <div class="flex flex-col items-center bg-gray-700 rounded p-2">
      <div class="flex items-center w-full">
        <div id="imageContainer" class="mr-2 shrink-0">
          <img
            class="w-12 h-12 object-contain shrink-0 border-2 rounded p-1 border-gray-700 transition-colors duration-200 hover:border-red-600 cursor-pointer"
            v-if="item.image && item.image.dataURI"
            :src="item.image.dataURI"
            :alt="item.image.title"
            title="Klik untuk menghapus gambar"
            @click="removeImage(i)"
            @keypress.space.enter.prevent="removeImage(i)"
            tabindex="0"
          />
          <button
            v-else
            class="p-3 h-12 w-12 box-border rounded cursor-pointer border border-dashed border-black hover:border-gray-400 focus:border-gray-400 transition-colors duration-200 focus:outline-none"
            @click="loadFile(i)"
            aria-label="Add product image"
            title="Tambahkan gambar produk"
            :class="dragOver ? 'outline-white' : ''"
            @drop.prevent="fileLoaded($event, i, true)"
            @dragleave.prevent.self="dragOver = false"
            @dragover.prevent.self="dragOver = true"
          >
            <input
              ref="import"
              type="file"
              accept="image/jpeg, image/png"
              v-show="false"
              @change="fileLoaded($event, i, false)"
              @click="$event.target.files = null"
            />
            <div
              class="w-6 h-6 pointer-events-none"
              v-html="require(`~/assets/icons/add-img.svg?include`)"
            ></div>
          </button>
        </div>
        <div class="w-full">
          <input
            class="px-4 w-full h-12 bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-500 hover:border-gray-500"
            ref="input"
            type="text"
            v-model="item.title"
            autocapitalize="words"
            aria-label="Enter product title"
            title="Masukkan nama produk"
            placeholder="Nama produk"
          />
        </div>
      </div>
      <textarea
        name="description"
        placeholder="Deskripsi produk"
        class="pDescription block mt-2 px-4 py-3 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-500 resize-none hover:border-gray-500"
        rows="2"
        v-model="item.description"
        aria-label="Enter product description"
        title="Masukkan deskripsi produk"
      ></textarea>
      <input
        type="text"
        name="price"
        class="pPrice px-4 h-12 mt-2 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-500 hover:border-gray-500"
        autocapitalize="words"
        placeholder="Harga"
        v-model="item.price"
        aria-label="Enter product price"
        title="Masukkan harga produk"
      />
      <div class="grid grid-cols-2 gap-x-2">
        <input
          type="text"
          name="link"
          class="pLink px-4 h-12 mt-2 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-500 hover:border-gray-500"
          placeholder="Tombol tautan"
          v-model="item.link"
          aria-label="Enter button link"
          title="Masukkan tombol tautan"
        />
        <input
          type="text"
          name="label"
          class="pLabel px-4 h-12 mt-2 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-500 hover:border-gray-500"
          placeholder="Label tombol"
          autocapitalize="words"
          v-model="item.label"
          aria-label="Enter button label"
          title="Masukkan label tombol"
        />
      </div>
    </div>
    <button
      class="p-1 m-2 shrink-0 focus:outline-none rounded hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200"
      @click="removeItem(i)"
      aria-label="Remove product"
      title="Hapus produk"
    >
      <div
        class="w-6 h-6"
        v-html="require(`~/assets/icons/x.svg?include`)"
      ></div>
    </button>
  </div>
</template>

<script>
export default {
  props: ['i', 'index', 'item', 'featured', 'showAlert', 'resizeImage'],
  data() {
    return {
      dragOver: false,
    }
  },
  methods: {
    removeImage(i) {
      this.featured[this.index].content[i].image = null
    },
    removeItem(i) {
      this.featured[this.index].content.splice(i, 1)
    },
    loadFile() {
      this.$refs.import.click()
    },
    getFileName(file) {
      return file.name.replace(/(?:\.([^.]+))?$/, '')
    },
    fileLoaded(e, i, dropped) {
      if (
        (dropped && e.dataTransfer.files.length) ||
        (!dropped && e.target.files.length)
      ) {
        let file = dropped ? e.dataTransfer.files[0] : e.target.files[0]
        let mimetype = file.type
        this.dragOver = false
        if (file && mimetype.match(/image\/jpeg|image\/png/gi)) {
          this.imageLoaded(file, i, mimetype)
        } else
          this.showAlert(
            'Format tidak didukung.\nHanya file jpeg dan png yang dapat dilampirkan.',
          )
      } else this.dragOver = false
    },
    imageLoaded(file, i, mime) {
      let title = this.getFileName(file)
      let reader = new FileReader()
      reader.onload = (f) => {
        let dataURI = f.target.result
        let ext = dataURI
          .split(',')[0]
          .split(':')[1]
          .split('/')[1]
          .match(/^\w+/g)[0]
        this.featured[this.index].content[i].image = {
          dataURI,
          file,
          type: 'image',
          ext,
          mime,
          title,
        }
        this.resizeImage(
          'product',
          mime,
          this.index,
          this.featured[this.index].content.length - 1
        )
      }
      reader.readAsDataURL(file)
    },
  },
  mounted() {
    !this.$refs.input.value && this.$refs.input.focus()
  },
}
</script>
