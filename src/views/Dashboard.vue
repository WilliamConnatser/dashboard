<template>
  <div class="p-sm-2">
    <div class="my-3 pb-2">
      <h1 class="text-lowercase">
        {{ greeting }}{{ name ? `, ${name.split(" ")[0]}` : "" }}
      </h1>
      <p class="text-muted">Here's an overview of your Citadel</p>
    </div>
    <b-row>
      <b-col col cols="12" md="6" xl="4">
        <lightning-wallet></lightning-wallet>
      </b-col>
      <b-col col cols="12" md="6" xl="4">
        <card-widget
          header="Bitcoin Core"
          :status="{
            text: syncPercent < 100 ? 'Synchronizing' : 'Running',
            variant: 'success',
            blink: false,
          }"
          sub-title="Synchronized"
          icon="icon-app-bitcoin.svg"
          :loading="syncPercent < 100 || blocks.length === 0"
        >
          <template #title>
            <CountUp
              v-if="syncPercent !== -1"
              :value="{
                endVal: syncPercent >= 99.99 ? 100 : syncPercent,
                decimalPlaces: syncPercent >= 99.99 ? 0 : 2,
              }"
              suffix="%"
            />
            <span
              v-else
              class="loading-placeholder loading-placeholder-lg"
              style="width: 140px"
            ></span>
          </template>
          <div class>
            <div class="d-flex w-100 justify-content-between px-3 px-lg-4">
              <p class="mb-1">Connected Peers</p>
              <p>
                {{ coreStats.peers }}
              </p>
            </div>
            <blockchain></blockchain>
            <div class="px-3 px-lg-4 py-3">
              <router-link to="/bitcoin" class="card-link">Manage</router-link>
            </div>
          </div>
        </card-widget>
      </b-col>
      <b-col col cols="12" xl="4">
        <b-row>
          <b-col col cols="12" md="6" xl="12">
            <card-widget
              header="Bitcoin Wallet"
              :status="{
                text: lightningSyncPercent < 100 ? 'Synchronizing' : 'Active',
                variant: 'success',
                blink: false,
              }"
              :sub-title="$filters.formatUnit(unit)"
              icon="icon-app-bitcoin.svg"
              :loading="lightningSyncPercent < 100"
            >
              <template #title>
                <div
                  v-if="btcBalance !== -1"
                  v-b-tooltip.hover.right
                  :title="$filters.satsToUSD(btcBalanceInSats)"
                >
                  <CountUp
                    :value="{
                      endVal: btcBalance,
                      decimalPlaces: unit === 'sats' ? 0 : 5,
                    }"
                  />
                </div>

                <span
                  v-else
                  class="loading-placeholder loading-placeholder-lg"
                  style="width: 140px"
                ></span>
              </template>
              <div class="px-3 px-lg-4 pt-2 pb-3">
                <router-link to="/bitcoin" class="card-link"
                  >Manage</router-link
                >
              </div>
            </card-widget>
          </b-col>
          <b-col col cols="12" md="6" xl="12">
            <storage-widget></storage-widget>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { satsToBtc } from "@/helpers/units.ts";

import CountUp from "@/components/Utility/CountUp.vue";
import CardWidget from "@/components/CardWidget.vue";
import Blockchain from "@/components/Blockchain.vue";
import LightningWallet from "@/components/LightningWallet.vue";
import StorageWidget from "../components/Widgets/StorageWidget.vue";

export default {
  components: {
    CountUp,
    CardWidget,
    Blockchain,
    LightningWallet,
    StorageWidget,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      lightningSyncPercent: (state) => state.lightning.percent,
      syncPercent: (state) => state.bitcoin.percent,
      blocks: (state) => state.bitcoin.blocks,
      btcBalance: (state) => {
        //skip if still loading
        if (state.bitcoin.balance.total === -1) {
          return -1;
        }
        if (state.system.unit === "btc") {
          return satsToBtc(state.bitcoin.balance.total);
        }
        return state.bitcoin.balance.total;
      },
      btcBalanceInSats: (state) => state.bitcoin.balance.total,
      unit: (state) => state.system.unit,
      stats: (state) => state.bitcoin.stats,
    }),
    greeting: () => {
      const currentHour = new Date().getHours();

      const greetingMessage =
        currentHour >= 4 && currentHour < 12 // after 4:00AM and before 12:00PM
          ? "Good morning"
          : currentHour >= 12 && currentHour <= 16 // after 12:00PM and before 5:00PM
          ? "Good afternoon"
          : currentHour > 16 || currentHour < 4 // after 5:00PM or before 4:00AM (to accommodate our fellow hackers)
          ? "Good evening"
          : "Welcome back"; // if for some reason the calculation didn't work

      return greetingMessage;
    },
  },
  created() {
    this.interval = window.setInterval(() => {
      this.$store.dispatch("bitcoin/getStats");
    }, 30000);
  },
  beforeUnmount() {
    window.clearInterval(this.interval);
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
