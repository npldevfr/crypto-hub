<script setup lang="ts">
import { ref } from 'vue'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue'

const currentTrigger = ref<string>('')
</script>

<template>
  <NavigationMenuRoot v-model="currentTrigger" class="relative z-1 flex w-full flex-row ">
    <NavigationMenuList class="center m-0 flex list-none rounded-[6px] bg-white p-1">
      <NavigationMenuItem>
        <NavigationMenuTrigger
            class="text-grass11 hover:bg-green3 focus:shadow-green7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
        >
          Learn
          <div
              class="i-radix-icons-caret-down text-green10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
            class=" data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-right data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right absolute top-0 left-0 w-full sm:w-auto"
        >
          <ul class="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
            <li class="row-span-3 grid">
              <NavigationMenuLink as-child>
                <a
                    class="focus:shadow-green7 from-green9 to-teal9 flex h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                    href="/"
                >
                  <img class="w-16" src="https://www.radix-vue.com/logo.svg">
                  <div class="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">Radix Primitives</div>
                  <p class="text-mauve4 text-[14px] leading-[1.3]">Unstyled, accessible components for Vue.</p>
                </a>
              </NavigationMenuLink>
            </li>

            <NavigationItem href="https://stitches.dev/" title="Stitches">
              CSS-in-JS with best-in-class developer experience.
            </NavigationItem>
            <NavigationItem href="/colors" title="Colors">
              Beautiful, thought-out palettes with auto dark mode.
            </NavigationItem>
            <NavigationItem href="https://icons.radix-ui.com/" title="Icons">
              A crisp set of 15x15 icons, balanced and consistent.
            </NavigationItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger
            class="text-grass11 hover:bg-green3 focus:shadow-green7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
        >
          Overview

        </NavigationMenuTrigger>
        <NavigationMenuContent class="data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-right data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right absolute top-0 left-0 w-full sm:w-auto">
          <ul class="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
            <NavigationItem title="Introduction" href="/docs/primitives/overview/introduction">
              Build high-quality, accessible design systems and web apps.
            </NavigationItem>
            <NavigationItem title="Getting started" href="/docs/primitives/overview/getting-started">
              A quick tutorial to get you up and running with Radix Primitives.
            </NavigationItem>
            <NavigationItem title="Styling" href="/docs/primitives/guides/styling">
              Unstyled and compatible with any styling solution.
            </NavigationItem>
            <NavigationItem title="Animation" href="/docs/primitives/guides/animation">
              Use CSS keyframes or any animation library of your choice.
            </NavigationItem>
            <NavigationItem title="Accessibility" href="/docs/primitives/overview/accessibility">
              Tested in a range of browsers and assistive technologies.
            </NavigationItem>
            <NavigationItem title="Releases" href="/docs/primitives/overview/releases">
              Radix Primitives releases and their changelogs.
            </NavigationItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
            class="text-grass11 hover:bg-green3 focus:shadow-green7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
            href="https://github.com/radix-vue"
        >
          Github
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuIndicator
          class="data-[state=hidden]:opacity-0 duration-200 data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[all,transform_250ms_ease]"
      >
        <div class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div class="perspect-[2000px] absolute top-full left-0 flex w-full justify-center">
      <NavigationMenuViewport
          class="data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[10px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]"
      />
    </div>
  </NavigationMenuRoot>
</template>
