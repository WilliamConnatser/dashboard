<template>
  <connection-details name="Blockstream Green" requires="bitcoind">
    <step-list>
      <step>
        Download
        <b-link
          href="https://play.google.com/store/apps/details?id=org.torproject.android"
          target="_blank"
          >Orbot</b-link
        >
        on your phone.
      </step>
      <step>
        Open Orbot, tap the gear icon under
        <span class="font-weight-bold">"Tor-Enabled apps"</span> and add Green.
      </step>
      <step>
        Tap <span class="font-weight-bold">"STOP"</span>, restart Orbot and turn
        on the <span class="font-weight-bold">"VPN Mode"</span>.
      </step>
      <step> Start Tor by tapping the big onion icon. </step>
      <step>
        Open Green on your phone and go to
        <span class="font-weight-bold"
          >Settings > Advanced > SPV synchronization</span
        >.
      </step>
      <step> Check <span class="font-weight-bold">"Enable SPV"</span>. </step>
      <step>
        Tap
        <span class="font-weight-bold">"Scan a QR code for SPV pairing"</span>.
      </step>
      <step>
        Scan this QR Code (click to enlarge)
        <qr-code
          :value="`${urls.bitcoin.p2p.address}:${urls.bitcoin.p2p.port}`"
          :size="300"
          class="qr-image mt-2"
          show-logo
          :style="{ cursor: 'pointer' }"
          @click="
            $emit(
              'showQrModal',
              `${urls.bitcoin.p2p.address}:${urls.bitcoin.p2p.port}`
            )
          "
        ></qr-code>
      </step>
      <step>
        Congratulations! You have successfully connected Blockstream Green to
        your Citadel.
      </step>
    </step-list>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails.vue";
import StepList from "@/components/ConnectWallet/StepList.vue";
import Step from "@/components/ConnectWallet/Step.vue";
import QrCode from "@/components/Utility/QrCode.vue";

export default {
  components: {
    ConnectionDetails,
    StepList,
    Step,
    QrCode,
  },
  props: {
    urls: {
      type: Object,
      required: true,
    },
  },
  emits: ["showQrModal"],
};
</script>
