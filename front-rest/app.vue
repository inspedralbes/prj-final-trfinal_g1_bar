<template>
  <PrimeToolbar>
    <template #start>
      <PrimeSidebar class="sidebar" v-model:visible="visible">
        <template #container="{ closeCallback }">
          <div class="flex flex-column h-full">
            <div class=" sidebarItemClose flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
              <span>
                <PrimeButton type="button" @click="closeCallback" icon="pi pi-times" rounded outlined
                  class="h-2rem w-2rem">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="44" height="44"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                  </svg>
                </PrimeButton>
              </span>
            </div>
            <div class="overflow-y-auto">
              <ul class="list-none p-3 m-0">
                <li>
                  <a v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                    <div @click="Rpush('/crearQR')">
                      <div class="sidebarItem">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-qrcode" width="44"
                          height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none"
                          stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                          <path d="M7 17l0 .01" />
                          <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                          <path d="M7 7l0 .01" />
                          <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                          <path d="M17 7l0 .01" />
                          <path d="M14 14l3 0" />
                          <path d="M20 14l0 .01" />
                          <path d="M14 14l0 3" />
                          <path d="M14 20l3 0" />
                          <path d="M17 17l3 0" />
                          <path d="M20 17l0 3" />
                        </svg>
                        <span class="font-medium text-decoration-none">Generar QR</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                    <div @click="Rpush('/llistat')">
                      <div class="sidebarItem">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard-list"
                          width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none"
                          stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                          <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M9 12l.01 0" />
                          <path d="M13 12l2 0" />
                          <path d="M9 16l.01 0" />
                          <path d="M13 16l2 0" />
                        </svg>
                        <span class="font-medium text-decoration-none">Llistat de taules</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                    <div @click="Rpush('/llistatCuina')">
                      <div class="sidebarItem">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sticker-2" width="44"
                          height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none"
                          stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M6 4h12a2 2 0 0 1 2 2v7h-5a2 2 0 0 0 -2 2v5h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z" />
                          <path d="M20 13v.172a2 2 0 0 1 -.586 1.414l-4.828 4.828a2 2 0 0 1 -1.414 .586h-.172" />
                        </svg>
                        <span class="font-medium text-decoration-none">Llistat de comandes</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>


          </div>
        </template>
      </PrimeSidebar>
      <PrimeButton icon="pi pi-bars" @click="visible = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
      </PrimeButton>
    </template>

    <template #center>

    </template>

    <template #end></template>
  </PrimeToolbar>

  <NuxtPage />
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    Rpush(path) {
      this.visible = false
      this.$router.push(path)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  border: 0;
}

.sidebar {
  width: fit-content;
  /* Width of the sidebar */
  height: 100vh;
  /* Height of the sidebar */
  position: fixed;
  /* Fix the sidebar to the left of the screen */
  left: 0;
  /* Position the sidebar at the left edge of the screen */
  top: 0;
  /* Position the sidebar at the top edge of the screen */
  background-color: #333;
  /* Background color of the sidebar */
  overflow-x: hidden;
  /* Prevent horizontal scrolling */
  padding-top: 20px;
  /* Padding at the top of the sidebar */
  transition: 0.5s;
  /* Transition effect when the sidebar is toggled */
  color: #fff;
  /* Text color */
}

.sidebar a {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  /* Font size of links */
  color: #818181;
  /* Color of links */
  display: block;
  /* Display links as blocks */
  transition: 0.3s;
  /* Transition effect when hovering over links */
}

.slider a {
  height: 44px;
  width: 44px;
}

.sidebar a:hover {
  color: #f1f1f1;
  /* Color of links when hovered over */
}

.list-none {
  list-style: none;
  padding: 0;
}

.sidebarItem {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
}

.text-decoration-none {
  text-decoration: none;
}

.sidebarItemClose {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>