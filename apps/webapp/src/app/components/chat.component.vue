<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AuthService } from './../services';
import { ChatRoomService, Message } from './../services/chat-room.service';
import ImageModal from './image.modal.vue';
import ChatHeader from './chat-header.component.vue';
import ChatNote from './chat-note.component.vue';
import ChatMessage from './chat-message.component.vue';
import ChatMeMessage from './chat-me-message.component.vue';

/**
 * 
 */
const emit = defineEmits(['searchClick'])


/**
 * 
 */
const messages = ref<Message[]>([]);

/**
 * 
 */
const messageInputElement = ref<HTMLElement>();

/**
 * 
 */
const fileInputElement = ref<HTMLInputElement>();

/**
 * 
 */
const selectedImage = ref<any>();

/**
 * 
 */
const imageModal = ref();

/**
 * 
 */
const username = AuthService.instance.username;

/**
 * 
 */
onMounted(() => {
    Noty.overrideDefaults({
        theme: 'limitless',
        layout: 'topRight',
        type: 'alert',
        timeout: 2500
    });

    ChatRoomService.instance.addMessagesChangedListener((values) => {
        messages.value.splice(0, values.length);
        values.forEach(value => messages.value.push(value));
    });

    ChatRoomService.instance.addErrorListener((error) => {
        new Noty({
            text: error,
            type: 'error'
        }).show();
    });
});

/**
 * 
 */
function onSearchClick() {
    emit('searchClick');
}

/**
 * 
 */
function onSendFileClick() {
    fileInputElement.value?.click();
}

/**
 * 
 */
function onFileChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        ChatRoomService.instance.sendFile(target.files[0]);
    }
}

/**
 * 
 * @param message 
 */
function onImageMessageClick(message: Message) {
    selectedImage.value = message.file;
    imageModal.value.open();
}

/**
 * 
 */
function onSendMessage() {
    messageInputElement.value?.blur();
    const message = messageInputElement.value?.innerText.trim()!!;
    ChatRoomService.instance.sendMessage(message);
    messageInputElement.value!!.innerText = '';
}

function onScroll(event: any) {
    if (Math.abs(event.target.scrollHeight + event.target.scrollTop - event.target.clientHeight) <= 5) {
        ChatRoomService.instance.pullOlderMessages();
    }
}
</script>

<template>
    <div class="card h-100 rounded-0">
        <ChatHeader @search-btn-click="onSearchClick" />

        <div class="card-body d-flex flex-column">
            <div class="media-chat-scrollable mb-3" @scroll="onScroll">
                <div class="media-chat vstack gap-3 pe-2">
                    <template v-for="message in messages" :key="message.id">
                        <ChatNote :message="message" v-if="message.type === 'note'" />
                        <ChatMessage :message="message" @image-click="onImageMessageClick(message)"
                            v-else-if="message.username !== username" />
                        <ChatMeMessage :message="message" @image-click="onImageMessageClick(message)"
                            v-else-if="message.username === username" />
                    </template>
                </div>
            </div>

            <div ref="messageInputElement" class="form-control form-control-content message-input mb-3" contenteditable
                @keydown.enter="onSendMessage" data-placeholder="Escribe un mensaje...">
            </div>

            <div class="d-flex align-items-center">
                <div>
                    <a href="#" class="btn btn-light btn-icon border-transparent rounded-pill btn-sm me-1"
                        data-bs-popup="tooltip" title="Send file" @click="onSendFileClick">
                        <i class="ph-paperclip"></i>
                    </a>
                    <input type="file" accept="image/*" ref="fileInputElement" @change="onFileChanged($event)"
                        style="display: none">
                </div>

                <button type="button" class="btn btn-primary ms-auto" @click="onSendMessage">
                    Enviar
                    <i class="ph-paper-plane-tilt ms-2"></i>
                </button>
            </div>
        </div>
    </div>
    <ImageModal ref="imageModal" :image="selectedImage" />
</template>

<style scoped>
.card-body {
    height: calc(100% - 60px);
}

.media-chat-scrollable {
    flex: 1;
}

.message-input {
    min-height: 40px;
}
</style>