<template>
  <div class="bg-gradient-to-br from-gray-900 to-indigo-900 min-h-screen text-gray-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-full sm:max-w-4xl">
      <header class="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-16">
        <NuxtLink to="/" class="transition-transform hover:scale-105 mb-4 sm:mb-0">
          <div
            class="logo w-24 sm:w-32"
            v-html="require(`~/assets/icons/logo.svg?include`)"
            title="Virtual Card Creator - Buat HTML Card Anda dengan mudah"
          ></div>
        </NuxtLink>
        <nav>
          <ul class="flex space-x-4 sm:space-x-6">
            <li><a href="#" class="hover:text-indigo-300 transition-colors">Home</a></li>
            <li><a href="#" class="hover:text-indigo-300 transition-colors">Features</a></li>
            <li><a href="#" class="hover:text-indigo-300 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>
    


      <!-- GUIDE  -->
      <main id="guide" class="mx-auto w-full">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Panduan Pengguna
        </h1>
        <h2 class="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
          Selamat datang di panduan HTML Card Generator! Ikuti langkah-langkah berikut untuk membuat HTML Card Anda.
        </h2>
        <div class="space-y-8 sm:space-y-12">
          <section class="bg-gray-800 bg-opacity-50 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 class="font-bold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-gray-200">
              Langkah 1: Buat HTML Card Anda
            </h3>
            <ul class="space-y-4 list-disc list-inside text-gray-200">
              <li>Gunakan formulir di halaman utama untuk memasukkan informasi HTML Card Anda.</li>
              <li>Pilih desain dan warna sesuai keinginan Anda.</li>
              <li>Klik tombol "Download ZIP" untuk menghasilkan kartu Anda.</li>
            </ul>
          </section>

          <section class="bg-gray-800 bg-opacity-50 rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 class="font-bold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-gray-200">
              Langkah 2: Unggah HTML Card Anda
            </h3>
            <p class="mb-4 text-gray-200">
              Setelah mengunduh file ZIP, Anda dapat mengunggah dan membagikan HTML Card Anda dengan beberapa cara:
            </p>
            <div class="bg-indigo-900 bg-opacity-50 p-4 rounded-md">
              <strong class="text-indigo-300">Hostingan pribadi</strong>
              <p class="mt-2 text-gray-200">Jika Anda memiliki hostingan pribadi, ada beberapa langkah yang harus dilakukan:</p>
              <ul class="px-6 list-outside list-disc">
                <li>
                  Login ke akun cPanel Anda. Cari dan buka file manager.
                </li>
                <li>
                  Di file manager, temukan folder bernama "public_html" dan buat
                  folder baru bernama "vcard" (atau sesuai keinginan Anda) di dalam
                  folder tersebut.
                </li>
                <li>
                  Unggah zip HTML Card ke dalam folder baru yang baru saja Anda
                  buat pada langkah sebelumnya.
                </li>
                <li>
                  Sekarang HTML Card Anda seharusnya sudah bisa diakses di alamat
                  <span class="text-orange-400">https://nama-domain.com/vcard/nama-folder-html-card/</span> dan siap
                  dibagikan.
                </li>
              </ul>
            </div>
            <div class="mt-4 bg-indigo-900 bg-opacity-50 p-4 rounded-md">
              <strong class="text-indigo-300">Gunakan Layanan Kami</strong>
              <p class="mt-2 text-gray-200">Kami menawarkan layanan hosting berbayar untuk HTML Card Anda. Cukup hubungi admin kami di 
                <a
                class="
                  font-extrabold
                  tracking-wide
                  leading-none
                  shrink-0
                  p-1
                  
                  text-orange-400
                  border-gray-700
                  rounded
                  hover:bg-gray-700
                  focus:bg-gray-700
                  transition-colors
                  duration-200
                "
                href="https://wa.me/6285145774280?text=Halo%20Kak,%20saya%20tertarik%20nih%20dengan%20hostingan%20HTML%20Card.%20Boleh%20minta%20penjelasan%20lebih%20lanjut?"
                target="_blank"
                rel="noreferrer"
                >nomor ini</a>
              </p>
            </div>
          </section>

          <section class="bg-gray-800 bg-opacity-50 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 class="font-bold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-gray-200">
              Langkah 3: Buka HTML Card
            </h3>
            Silahkan buka tautan/link HTML Card Anda dan bagikan kepada orang sekeliling Anda.
          </section>
        </div>
      </main>


     
      <!-- FAQ Section -->
      <section class="mt-12 sm:mt-16">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-indigo-300">
            Frequently Asked Question (FAQ)
          </h2>
          <div class="space-y-4">
            <div v-for="(item, index) in faqItems" :key="index" class="bg-gray-800 bg-opacity-50 rounded-lg">
              <button 
                @click="toggleFaq(index)"
                class="w-full text-left p-4 sm:p-6 flex justify-between items-center focus:outline-none"
              >
                <h3 class="font-semibold text-lg sm:text-xl text-orange-400">
                  {{ item.question }}
                </h3>
                <span class="text-2xl text-indigo-300">
                  {{ item.isOpen ? '−' : '+' }}
                </span>
              </button>
              <div v-if="item.isOpen" class="p-4 sm:p-6 pt-0 text-gray-200">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </section>
      
      <Help class="mt-16" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Help from '@/components/Help'

export default {
  components: {
    Footer,
    Help,
  },
  data() {
    return {
      faqItems: [
        {
          question: "Apakah layanan ini gratis?",
          answer: "Ya, layanan pembuatan HTML Card kami sepenuhnya gratis untuk digunakan. Tetapi untuk opsi hosting akan dikenakan biaya tambahan.",
          isOpen: false
        },
        {
          question: "Apa kegunaan HTML Card",
          answer: "HTML Card dapat Anda jadikan sebagai kartu identitas diri Anda dan dapat ditaruh pada media sosial seperti bio Instagram atau profil Linkedin. Anda juga dapat menggunakan HTML Card untuk mempromosikan bisnis Anda.",
          isOpen: false
        },
        {
          question: "Kenapa HTML Card saya berbentuk zip?",
          answer: "HTML Card Anda akan berbentuk zip untuk mempermudah dalam proses penguploadan di hostingan.",
          isOpen: false
        },
        {
          question: "Berapa lama HTML Card saya akan tersimpan?",
          answer: "HTML Card Anda akan tersimpan di server kami selama 1 tahun. Setelah itu, Anda dapat memperpanjang masa penyimpanan dengan mudah.",
          isOpen: false
        },
        {
          question: "Dapatkah saya mengedit HTML Card setelah dibuat?",
          answer: "Tidak, Anda tidak dapat mengedit informasi yang ada pada HTML Card Anda. Pastikan semua informasi yang Anda masukkan sudah benar sebelum mendownload zip HTML Card Anda.",
          isOpen: false
        },
        {
          question: "Bagaimana cara membagikan HTML Card saya?",
          answer: "Setelah HTML Card Anda dibuat, Anda akan menerima tautan/link. Anda dapat membagikan tautan ini melalui email, pesan teks, atau media sosial.",
          isOpen: false
        }
      ]
    }
  },
  methods: {
    toggleFaq(index) {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

@media (min-width: 640px) {
  body {
    font-size: 18px;
  }
}
</style>