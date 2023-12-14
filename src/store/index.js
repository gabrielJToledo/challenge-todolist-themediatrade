import { createStore } from 'vuex';
import tasks from '@/store/modules/task';
import formModal from '@/store/modules/formModal'

export default createStore({
  modules: {
    tasks,
    formModal
  },
});
