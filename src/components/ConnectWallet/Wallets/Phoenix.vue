<template>
  <connection-details name="Phoenix Wallet" requires="electrum">
    <step-list>
      <step> Open Phoenix Wallet on your phone. </step>
      <step>
        Go to <span class="font-weight-bold">Settings > Electrum Server</span>.
      </step>
      <step> Tap <span class="font-weight-bold">"Set server..."</span>. </step>
      <step>
        Check <span class="font-weight-bold">"Use a custom server"</span>.
      </step>
      <step>
        For your server address enter
        <input-copy
          :value="`${urls.bitcoin.electrum.address}:${urls.bitcoin.electrum.port}`"
          auto-width
        ></input-copy>
      </step>
      <step> Tap <span class="font-weight-bold">"Confirm"</span> </step>
      <step> Go to <span class="font-weight-bold">Settings > Tor</span>. </step>
      <step> Enable Tor. </step>
      <step>
        Congratulations! You have successfully connected Phoenix Wallet to your
        Citadel.
      </step>
    </step-list>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails.vue";
import StepList from "@/components/ConnectWallet/StepList.vue";
import Step from "@/components/ConnectWallet/Step.vue";
import InputCopy from "@/components/Utility/InputCopy.vue";

export default {
  components: {
    ConnectionDetails,
    StepList,
    Step,
    InputCopy,
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
