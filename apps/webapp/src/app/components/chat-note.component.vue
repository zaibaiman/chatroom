<script setup lang="ts">
/**
 * 
 */
const props = defineProps(['message'])
</script>

<template>
    <div class="content-divider justify-content-center text-muted mx-0">
        {{ props.message.text }}</div>
</template>