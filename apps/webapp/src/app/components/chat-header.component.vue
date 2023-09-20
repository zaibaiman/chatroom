<script setup lang="ts">
import { useRouter } from "vue-router";
import { AuthService } from './../services';
import { ChatRoomService } from './../services/chat-room.service';

/**
 * 
 */
const emit = defineEmits(['searchBtnClick'])

/**
 * 
 */
const router = useRouter();

/**
* 
*/
function onSearchClick() {
    emit('searchBtnClick');
}

/**
 * 
 */
function onLogoutClick() {
    ChatRoomService.instance.dispose();
    AuthService.instance.logout();
    router.push('login');
}
</script>

<template>
    <div class="card-header d-flex align-items-center bg-color-tatium">
        <h5 class="mb-0">Mensajes</h5>
        <div class="hstack gap-4 ms-auto">
            <a href="#" class="text-body" @click="onSearchClick">
                <i class="ph-magnifying-glass"></i>
            </a>
            <!-- <a href="#" class="text-body">
                <i class="ph-video-camera"></i>
            </a> -->
            <div class="dropdown">
                <a href="#" class="text-body" data-bs-toggle="dropdown">
                    <i class="ph-dots-three-outline-vertical"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                    <a href="#" class="dropdown-item" @click="onLogoutClick">Logout</a>
                </div>
            </div>
        </div>
    </div>
</template>