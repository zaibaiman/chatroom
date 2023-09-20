<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Chat from './../components/chat.component.vue';
import Search from './../components/search.component.vue';
import { AuthService, ChatRoomService } from './../services';
import Users from './../components/users.component.vue';

/**
 * 
 */
const showSearchPanel = ref<boolean>(false);

/**
 * 
 */
onMounted(() => {
    ChatRoomService.instance.join(AuthService.instance.username!!);
});

/**
 * 
 */
function onChatSearchClick() {
    showSearchPanel.value = true;
}

/**
 * 
 */
function onSearchCloseClick() {
    showSearchPanel.value = false;
}

</script>

<template>
    <div class="page-content">
        <Users />
        <div class="content-wrapper">
            <div class="content-inner">
                <div class="content d-flex flex-column h-100 p-0">
                    <Chat @search-click="onChatSearchClick" />
                </div>
            </div>
        </div>
        <template v-if="showSearchPanel">
            <Search @close="onSearchCloseClick" />
        </template>
    </div>
</template>