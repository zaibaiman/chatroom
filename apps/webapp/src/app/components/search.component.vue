<script setup lang="ts">
import { ref } from 'vue';
import { ChatRoomService, Message } from '../services';
import { isEmpty, isNil } from 'lodash';

/**
 * 
 */
const emit = defineEmits(['close']);

/**
 * 
 */
const query = ref<string>();

/**
 * 
 */
const messages = ref<Message[]>([]);

/**
 * 
 */
function onCloseClick() {
    emit('close');
}

/**
 * 
 * @param message 
 */
function onMessageClick(message: Message) {
    ChatRoomService.instance.gotoMessage(message.id);
}

/**
 * 
 */
async function onSearchEnter() {
    messages.value.splice(0, messages.value.length);
    if (!isNil(query.value) && !isEmpty(query.value.trim())) {
        const results = await ChatRoomService.instance.search(query.value);
        results.forEach(it => messages.value.push(it));
    }
}

/**
 * 
 * @param message 
 */
 function formatMessageDate(message: Message) {
    const createdDate = new Date(message.createdAt);

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const monthName = months[createdDate.getMonth()];
    const hour = createdDate.getHours();
    const minutes = createdDate.getMinutes();

    return `${monthName} ${hour}:${minutes}`;
}
</script>

<template>
    <div class="sidebar sidebar-end sidebar-expand-lg">
        <div class="sidebar-content">
            <div class="sidebar-section">
                <div class="sidebar-section-header border-bottom bg-color-tatium p-18">
                    <a href="#" class="text-body" @click="onCloseClick">
                        <i class="ph-x pe-3"></i>
                    </a>
                    <span class="fw-semibold">Buscar mensajes</span>
                </div>
                <div class="sidebar-section-body pb-0">
                    <div class="form-control-feedback form-control-feedback-start mb-2">
                        <input type="search" class="form-control" placeholder="Buscar..." v-model="query"
                            @keydown.enter="onSearchEnter">
                        <div class="form-control-feedback-icon">
                            <i class="ph-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sidebar-section">
                <div class="sidebar-section-header border-bottom p-1">
                </div>

                <div class="list-group list-group-borderless py-0">
                    <a href="#" class="list-group-item list-group-item-action border-bottom" v-for="message in messages" @click="onMessageClick(message)">
                        <div>
                            {{ message.username }}: {{ message.text }}
                            <div class="fs-sm text-muted">{{ formatMessageDate(message) }}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
