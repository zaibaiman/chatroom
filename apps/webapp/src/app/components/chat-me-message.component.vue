<script setup lang="ts">
/**
 * 
 */
const props = defineProps(['message'])

/**
 * 
 */
const emit = defineEmits(['imageClick']);

/**
 * 
 * @param message 
 */
function onImageClick() {
    emit('imageClick');
}

/**
 * 
 * @param message 
 */
function formatMessageDate() {
    const createdDate = new Date(props.message.createdAt);

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
    <div class="media-chat-item media-chat-item-reverse hstack align-items-start gap-3">
        <div>
            <div class="media-chat-message">
                <div class="fs-sm lh-sm">
                    <span class="fw-semibold">{{ props.message.username }}</span>
                    <span class="opacity-50 ms-2">{{ formatMessageDate() }}</span>
                </div>
                <a href="#" class="d-block mx-1 mt-1" @click="onImageClick" v-if="props.message.type === 'file'">
                    <img :src="message.file" class="img-fluid card-img" style="width: 200px; height: auto" alt="">
                </a>
                {{ props.message.text }}
            </div>
        </div>
    </div>
</template>