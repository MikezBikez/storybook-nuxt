import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import steps from "./next-step.vue";

storiesOf("Steps", module).add("Example", () => ({
  components: { steps },
  template: "<Steps />"
}));
