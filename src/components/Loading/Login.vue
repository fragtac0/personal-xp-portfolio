<template>
  <ContentCenter class="bg-color-load-blue radial-gradient-loading">
    <template #top>
      <div class="absolute bg-color-load-header-blue w-full md:h-32 h-1/6 top-0 down-stroke-white-2" />
    </template>

    <template #center>
      <div class="flex w-full">
        <div class="md:flex hidden justify-end items-center w-1/2">
          <div>
            <div class="flex justify-end w-full">
              <div class="w-2/3">
                <img src="/img/logo-portfolio-white.webp" :alt="$t('alt.logoLogin')" class="mb-3" />
              </div>
            </div>
            <div class="w-full flex justify-end">
              <div class="w-10/12 mr-12">
                <h2 class="text-white text-lg text-right">
                  {{ $t('message.toBegin') }}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div class="w-px h-96 line-loading-gradient mx-3 md:flex hidden"></div>
        <LoginForm />
      </div>
    </template>

    <template #bottom>
      <div class="absolute bg-color-load-header-blue w-full md:h-48 h-1/5 bottom-0 up-stroke-green-2">
        <div class="flex justify-center items-center h-full">
          <div class="app-container">
            <div class="flex justify-end items-center md:gap-8 gap-8">
              <div class="flex text-white md:text-sm text-xs font-bold md:mr-10 md:w-2/6">
                <h4>
                  {{ $t('message.explainer') }}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ContentCenter>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import LoginForm from '@/components/Loading/LoginForm.vue'
import ContentCenter from '@/layouts/ContentCenter.vue'

const { locale } = useI18n()
const dropdownOpen = ref(false)
const locales = ['en', 'fr']
const localeNames = {
  en: 'English',
  fr: 'Français'
}

// Initialize currentLocale from localStorage if it exists, otherwise use the default locale
const storedLocale = localStorage.getItem('currentLocale')
const currentLocale = ref(storedLocale || locale.value)

// Set the initial locale value
locale.value = currentLocale.value

// Watch for changes in currentLocale and update localStorage and locale.value
watch(currentLocale, (newLocale) => {
  localStorage.setItem('currentLocale', newLocale)
  locale.value = newLocale
})

const flagSrc = computed(() => {
  return `/img/icons/langs/flag-${currentLocale.value}.webp`
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const changeLocale = (newLocale) => {
  currentLocale.value = newLocale
  dropdownOpen.value = false
}

const filteredLocales = computed(() => {
  return locales.filter((l) => l !== currentLocale.value)
})
</script>
