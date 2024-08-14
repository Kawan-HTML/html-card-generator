<template>
  <div id="downloadSection" class="mt-16">
    <h2 class="font-extrabold text-2xl">Download</h2>
    <div class="stepC mt-6">
      <p>Lengkapi checklist berikut terlebih dahulu:</p>
      <Check
        v-for="(item, index) in downloadCheckList"
        :downloadCheckList="downloadCheckList"
        :item="item"
        :key="index"
        :index="index"
      />
      <button
        ref="downloadPackage"
        @click="downloadPackage"
        class="inline-block bg-gray-700 leading-none text-2xl tracking-wide border-2 border-transparent font-extrabold p-6 rounded mt-12 select-none transition-colors duration-200 focus:outline-none"
        :title="
          downloadChecked
            ? ''
            : 'Lengakapi checklist terlebih dahulu untuk mendownload'
        "
        :class="
          downloadChecked
            ? 'bg-orange-600 cursor-pointer text-white focus:bg-orange-500 hover:bg-orange-500'
            : 'cursor-not-allowed text-black'
        "
      >
        Download ZIP
      </button>
      <p class="mt-6 border p-4 rounded border-gray-700 text-gray-400">
        Ekstrak file ZIP yang telah diunduh dan ikuti
        <NuxtLink
          to="/hosting-guide"
          class="cursor-pointer underline font-extrabold text-orange-600 hover:text-orange-500 focus:text-orange-500 transition-colors duration-200"
          >Hosting&nbsp;Guide</NuxtLink
        >
        untuk mengetahui cara mengunggah kartu Anda ke internet.
        <br /><br />
        Suka dengan desain kartu virtual Anda? Siap untuk membagikannya ke internet?
        Hanya dengan harga yang sangat murah, Anda bisa mendapatkan layanan publikasi ke internet. Jika Anda tertarik
        silahkan hubungi nomor WhatsApp kami di
        <br/>
        <a
          class="inline-block font-extrabold tracking-wide leading-none shrink-0 p-3 text-white bg-green-700 rounded hover:bg-green-600 focus:bg-green-600 transition-colors duration-200 mt-4"
          href="https://wa.me/6285145774280"
          rel="noreferrer"
          target="_blank"
          @click="'prepareZipAndWhatsapp'"
          >Chat on Whatsapp</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import Check from '@/components/Check'
export default {
  props: ['downloadCheckList', 'downloadChecked', 'downloadPackage'],
  components: {
    Check,
  },

  data() {
    return {
      whatsappLink: ''
    }
  },

  methods: {
    prepareZipAndWhatsapp() {
      // Fungsi untuk menghasilkan file ZIP
      this.generateZip().then(() => {
        // Menyiapkan pesan
        const message = encodeURIComponent(
          "Halo, saya tertarik dengan publikasi kartu virtual. " +
          "Saya telah mengunduh file ZIP dan ingin menggunakan layanan ini untuk mengunggahnya. "
        );

        // Memperbarui link WhatsApp dengan pesan yang sudah disiapkan
        this.whatsappLink = `https://wa.me/6285145774280?text=${message}`;
        
        // Buka WhatsApp dalam tab baru
        window.open(this.whatsappLink, '_blank');
      });
    },

    generateZip() {
      // Implementasi untuk menghasilkan dan mengunduh file ZIP
      return new Promise((resolve, reject) => {
        fetch('/api/generate-zip')
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'kartu_digital.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            resolve();
          })
          .catch(error => {
            console.error('Error generating ZIP:', error);
            reject(error);
          });
      });
    }
  }
}
</script>