<template>
  <connection-details name="Zap (Desktop)" requires="lnd">
    <step-list>
      <step>
        Open Zap Desktop and click
        <span class="font-weight-bold">"Connect"</span> on the welcome screen.
      </step>
      <step>
        In the <span class="font-weight-bold">"Connection String"</span>, enter
        <input-copy
          class="d-block mt-2 mb-1"
          :value="urls.lnd.grpcLocal"
        ></input-copy>
      </step>
      <step>
        Click <span class="font-weight-bold">"Next"</span> two times to confirm.
      </step>
      <step>
        Congratulations! You have successfully connected Zap (Desktop) to your
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
