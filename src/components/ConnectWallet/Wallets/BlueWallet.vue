<template>
  <connection-details name="BlueWallet" requires="electrum">
    <step-list>
      <step>
        Install the
        <b-link to="/app-store/bluewallet">BlueWallet Lightning</b-link> app on
        your Citadel.
      </step>
      <step>
        Open BlueWallet on your phone, tap the three dots to access the settings
        and go to
        <span class="font-weight-bold">Network > Lightning Settings</span>.
      </step>
      <step>
        Tap <span class="font-weight-bold">"Scan or import a file"</span>.
      </step>
      <step>
        Scan the QR code displayed in the
        <b-link to="/app-store/bluewallet">BlueWallet Lightning</b-link> app on
        your Citadel.
      </step>
      <step> Tap <span class="font-weight-bold">"Save"</span>. </step>
      <step>
        Now go to
        <span class="font-weight-bold">Network > Electrum Server</span>.
      </step>
      <step>
        Tap <span class="font-weight-bold">"Scan or import a file"</span>.
      </step>
      <step>
        Scan this QR Code (click to enlarge)
        <qr-code
          :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`"
          :size="300"
          class="qr-image mt-2"
          show-logo
          :style="{ cursor: 'pointer' }"
          @click="
            $emit(
              'showQrModal',
              `${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`
            )
          "
        ></qr-code>
      </step>
      <step>
        Tap <span class="font-weight-bold">"Save"</span> and restart BlueWallet.
      </step>
      <step>
        Congratulations! You have successfully connected BlueWallet to your
        Citadel.
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
