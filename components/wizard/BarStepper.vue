<script setup lang="ts">
    const {progressStep} = defineProps<{
        progressStep: number;
    }>();

    const statusSteps = () =>  {
        return ( 100 / 3 ) * ( progressStep   ) + '%'
    }   
</script>

<template>
    <div class="wrapper-stepper">
        <div class="stepper">
            <div class="stepper-progress">
                <div class="stepper-progress-bar" :style="'width:' + statusSteps"></div>
            </div>
            <div 
                class="stepper-item"
                :class="{ 'current': progressStep === item, 'success': progressStep > item }"
                v-for="item in 3" :key="item">
                    <div class="stepper-item-counter">
                        <i class="bi bi-check-circle icon-success"></i>
                        <span class="number">
                            {{ item }}
                        </span>
                    </div>
                    <span class="stepper-item-title">
                        step {{ item }}
                    </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../../scss/index.scss';
    $default: #C5C5C5;
    $green-1: #198754;
    $green-2: #26ab6d;
    $transiton: all 0.3s ease;

    .wrapper-stepper {
        border-radius: rem(32);
        box-shadow: rgba($color: #000000, $alpha: 0.09);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: rem(24);
       
        .stepper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: rem(600);
            position: relative;
            z-index: 0;
    
            .stepper-progress {
                position: absolute;
                background-color: $default;
                height: rem(2);
                width: 100%;
                z-index: -1;
                left: 0;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
    
                .stepper-progress-bar {
                    position: absolute;
                    left: 0;
                    height: 100%;
                    width: 0%;
                    background-color: $green-1;
                    transition: $transiton;
                }
            }
        }

        .stepper-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: $default;
            transition: $transiton;

            .stepper-item-counter {
                height: rem(68);
                width: rem(68);
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                border-radius: 100%;
                border: rem(2) solid $default;
                position: relative;

                .icon-success {
                    position: absolute;
                    opacity: 0;
                    transition: $transiton;
                    text-align: center;
                    @include font-size-line-weight(30, 30);
                }

                .number {
                    @include font-size-line-weight(22, 24);
                    transition: $transiton;
                    
                }
            }

            .stepper-item {
                @include font-size-line-weight(14, 16);

            }

            .stepper-item-title {
                position: absolute;
                bottom: rem(-24);
            }

            &.success {
                .stepper-item-counter{
                    border-color: $green-2;
                    background-color: #c8ebc1;
                    color: $green-2;
                    font-weight: 600;
        
                    .icon-success {
                        opacity: 1;
                    }
        
                    .number {
                        opacity: 0;
                        transform: scale(0);
                    }
                }
        
                .stepper-item-title {
                    color: $green-2;
                }
            }

            &.current {
                .stepper-item-counter {
                    border-color: $green-1;
                    background-color: $green-1;
                    color: #fff;
                    font-weight: 500;
                }

                .number {
                    color: #fff
                }
        
                .stepper-item-title {
                    color: #212529;
                }
            }
        }

    }
    /*
    .tx-green-1{
        color: $green-1;
        font-weight: 500;
    }

    .wrapper-stepper {
        border-radius: rem(32);
        box-shadow: rgba($color: #000000, $alpha: 0.09);
    }

    .stepper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: rem(600);
        position: relative;
        z-index: 0;
        margin-bottom: 24px;

        &-progress{
            position: absolute;
            background-color: $default;
            height: 2px;
            z-index: -1;
            left: 0;
            right: 0;
            margin: 0 auto;

            &-bar{
                position: absolute;
                left: 0;
                height: 100%;
                width: 0%;
                background-color: $green-1;
                transition: $transiton;
            }
        }
    }

    .stepper-item{
        display: flex;
        align-items: center;
        justify-content: center;
        color: $default;
        transition: $transiton;

        &-counter{
            height: 68px;
            width: 68px;
            display: grid;
            place-items: center;
            background-color: #fff;
            border-radius: 100%;
            border: 2px solid $default;
            position: relative;

            .icon-success{
                position: absolute;
                opacity: 0;
                transform: scale(0);
                width: rem(24);
                transition: $transiton;
            }

            .number{
                font-size: 22px;
                transition: $transiton;
            }
        }

        &-title{
            position: absolute;
            font-size: 14px;
            bottom: -24px;
        }
    }

    .stepper-item.success{
        .stepper-item-counter{
            border-color: $green-1;
            background-color: #c8ebc1;
            color: #fff;
            font-weight: 600;

            .icon-success{
                opacity: 1;
                transform: scale(1);
            }

            .number{
                opacity: 0;
                transform: scale(0);
            }
        }

        .stepper-item-title{
            color: $green-1;
        }
    }

    .stepper-item.current{
        .stepper-item-counter{
            border-color: $green-1;
            background-color: $green-1;
            color: #fff;
            font-weight: 600;
        }

        .stepper-item-title{
            color: #818181;
        }
    }

    .stepper-pane{
        color: #333;
        text-align: center;
        padding: 120px 60px;
        box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.09);
        margin: 40px 0;
    }

    .controls{
        display: flex;
    }

    .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 16px;
        border: 1px solid;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        line-height: 1.5;
        transition: all 150ms;
        border-radius: 4px;
        width: fit-content;
        font-size: 0.75rem;
        color: #333;
        background-color: #f0f0f0;
        border-color: #f0f0f0;

        &:disabled{
            opacity: 0.5;
            pointer-events: none;
        }

        &--green-1{
            background-color: $green-1;
            border-color: $green-1;
            color: #fff;
            margin-left: auto;
        }
    }
*/
</style>
