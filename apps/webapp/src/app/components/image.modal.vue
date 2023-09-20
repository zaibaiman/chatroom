<script setup lang="ts">
import { ref } from 'vue';

/**
 * 
 */
const props = defineProps(['image'])

/**
 * 
 */
const imageModal = ref<HTMLDivElement>();

/**
 * 
 */
function open() {
    $(imageModal.value).modal('show');
}

defineExpose({
    open
});
</script>

<template>
    <div ref="imageModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <img :src="props.image" class="img-fluid card-img w-100 h-auto">
                </div>
            </div>
        </div>
    </div>
</template>
