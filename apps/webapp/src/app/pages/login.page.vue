<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { isNil, isEmpty } from 'lodash'
import { AuthService } from '../services';

/**
 * 
 */
const username = ref<string>();

/**
 * 
 */
const hasError = ref<boolean>(false);

/**
 * 
 */
const errorMessage = ref<string>();

/**
 * 
 */
const router = useRouter();

/**
 * 
 */
function onLoginClick() {
    if (isNil(username.value) || isEmpty(username.value.trim())) {
        hasError.value = true;
        errorMessage.value = 'Este campo es requerido';
    } else if(!/^[a-zA-Z\s]+$/.test(username.value)) {
        hasError.value = true;
        errorMessage.value = 'El campo solo debe tener letras y espacios en blanco';
    } else {
        AuthService.instance.login(username.value);
        router.push('/');
    }
}
</script>

<template>
    <div class="page-content">
        <div class="content-wrapper">
            <div class="content-inner">
                <div class="content d-flex justify-content-center align-items-center">
                    <div class="login-form">
                        <div class="card mb-0">
                            <div class="card-body">
                                <div class="text-center mb-3">
                                    <div class="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                                        <img src="/images/logo_icon.svg" class="h-48px" alt="">
                                    </div>
                                    <h5 class="mb-0">Inicia sesión con tu cuenta</h5>
                                    <span class="d-block text-muted">Captura tus credenciales abajo</span>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Nombre</label>
                                    <div class="form-control-feedback form-control-feedback-start">
                                        <input type="text" class="form-control" :class="{ 'is-invalid': hasError }"
                                            v-model="username">
                                        <div class="form-control-feedback-icon">
                                            <i class="ph-user-circle text-muted"></i>
                                        </div>
                                        <div class="form-text" v-if="hasError">{{ errorMessage }}</div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary w-100" @click="onLoginClick">Iniciar
                                        sesión</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>