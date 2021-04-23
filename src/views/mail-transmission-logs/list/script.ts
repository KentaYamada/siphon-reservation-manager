import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import MailTransmissionLogList from "@/components/mail-transmission-logs/list/MailTransmissionLogList.vue";
import MailTransmissionLogSearchForm from "@/components/mail-transmission-logs/search-form/MailTransmissionLogSearchForm.vue";
import {
  FETCH,
  HAS_ITEMS,
  INITIALIZE,
  IS_LOAD_COMPLETED,
  LAZY_LOAD,
  UPDATE_RESERVER_NAME,
  UPDATE_SEND_DATE
} from "@/store/constant";

/**
 * Mail transmission log list view
 */
export default Vue.extend({
  name: "mail-transmission-log-list-view",
  components: {
    MailTransmissionLogList,
    MailTransmissionLogSearchForm
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState("mailTransmissionLog", ["mailTransmissionLogs", "searchOption"]),
    ...mapGetters("mailTransmissionLog", {
      hasItems: HAS_ITEMS,
      isLoadCompleted: IS_LOAD_COMPLETED
    })
  },
  created() {
    this.initialize();
  },
  mounted() {
    document.getElementById("infinite-list")?.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    document.getElementById("infinite-list")?.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions("mailTransmissionLog", {
      fetch: FETCH,
      lazyLoad: LAZY_LOAD
    }),

    ...mapMutations("mailTransmissionLog", {
      initialize: INITIALIZE,
      updateReserverName: UPDATE_RESERVER_NAME,
      updateSendDate: UPDATE_SEND_DATE
    }),

    handleClearSearchOption(): void {
      this.initialize();
    },

    handleScroll(e: Event): void {
      e.preventDefault();

      if (e.target instanceof Element) {
        const isLazyLoad = e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight;

        if (isLazyLoad && !this.isLoadCompleted) {
          this.isLoading = true;
          this.lazyLoad(this.searchOption)
            .catch(() => {
              const config: BNoticeConfig = {
                type: "is-danger",
                message: "データの取得に失敗しました"
              };

              this.$buefy.toast.open(config);
            })
            .finally(() => (this.isLoading = false));
        }
      }
    },

    handleSearch(): void {
      this._fetch();
    },

    handleUpdateReserveName(value: string): void {
      this.updateReserverName(value);
    },

    handleUpdateSendDate(value: Date): void {
      this.updateSendDate(value);
    },

    _fetch(): void {
      this.isLoading = true;
      this.fetch(this.searchOption)
        .catch(() => {
          const config: BNoticeConfig = {
            type: "is-danger",
            message: "データの取得に失敗しました"
          };
          this.$buefy.toast.open(config);
        })
        .finally(() => (this.isLoading = false));
    }
  }
});
