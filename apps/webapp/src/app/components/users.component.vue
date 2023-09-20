<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ChatRoomService, User } from './../services';

/**
 * 
 */
const users = ref<User[]>([]);

/**
 * 
 */
onMounted(() => {
    ChatRoomService.instance.addUsersChangedListener((values) => {
        users.value.splice(0, users.value.length);
        values.forEach(value => users.value.push(value));
    });
})

</script>

<template>
    <div class="sidebar sidebar-secondary sidebar-expand-lg">
        <button type="button" class="btn btn-sidebar-expand sidebar-control sidebar-secondary-toggle h-100">
            <i class="ph-caret-right"></i>
        </button>

        <div class="sidebar-content">
            <div class="sidebar-section">
                <div class="sidebar-section-header border-bottom bg-color-tatium p-18">
                    <span class="fw-semibold">Usuarios</span>
                </div>

                <div class="collapse show" id="sidebar-users">
                    <div class="sidebar-section-body">
                        <div class="d-flex mb-3" v-for="user in users" :key="user.id">
                            <a href="#"
                                class="d-inline-flex align-items-center justify-content-center bg-primary text-white lh-1 rounded-pill w-40px h-40px me-2">
                                <span class="letter-icon">{{ user.name.charAt(0) }}</span>
                            </a>
                            <div class="flex-fill pt-2">
                                <a href="#" class="fw-semibold">{{ user.name }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
