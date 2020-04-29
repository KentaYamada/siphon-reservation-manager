import { GetterTree } from "vuex";

// strore
import { RootState } from "@/store";
import { AuthState } from "@/store/auth";
import { IS_SIGNED_IN } from "@/store/constant";

const getters: GetterTree<AuthState, RootState> = {
    /**
     * ログイン済かどうか
     */
    [IS_SIGNED_IN]: (state: AuthState): boolean => {
        return state.is_signin;
    }
};

export default getters;