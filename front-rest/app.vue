<template>
  <PrimeToolbar>
    <template #start>
      <PrimeSidebar class="sidebar" v-model:visible="visible">
        <template #container="{ closeCallback }">
          <div class="flex flex-column h-full">
            <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
              <span class="inline-flex align-items-center gap-2">
                <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                    fill="var(--primary-color)" />
                  <path
                    d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                    fill="var(--text-color)" />
                </svg>
                <span class="font-semibold text-2xl text-primary">Your Logo</span>
              </span>
              <span>
                <PrimeButton type="button" @click="closeCallback" icon="pi pi-times" rounded outlined
                  class="h-2rem w-2rem"></PrimeButton>
              </span>
            </div>
            <div class="overflow-y-auto">
              <ul class="list-none p-3 m-0">
                <li>
                  <a v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
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
                      <span class="font-medium">Generar QR</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
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
                      <span class="font-medium">Llistat de taules</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>


          </div>
        </template>
      </PrimeSidebar>
      <PrimeButton icon="pi pi-bars" @click="visible = true" />
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
</style>