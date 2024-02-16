
<script setup lang="ts">
    defineProps<{
        item: Data[];
        showAction: boolean;
        showAdd: Boolean;
        title: string;
        listBooking?: boolean;
        isSearch: string;
    }>();
</script>

<template>
    <div class="content-title">
        <h2>{{title}}</h2>
    </div>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Description</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Price</th>
                  <th  v-if="!listBooking" scope="col">Reviews</th>
                  <th v-if="listBooking" scope="col">Payment</th>
                  <th v-if="listBooking" scope="col">Personal notes</th>
                </tr>
              </thead>
            <tbody>
              <template v-if="item.length">
                <tr class="wrapper-info-row"
                    v-for="info, index in item"
                    :key="index"
                >
                    <td class="content-image wrapper-info">
                        <img 
                            class="image-travel" 
                            :src="info.image"
                            alt="img">
                    </td>
                    <td class="wrapper-info name-travel">
                        <p class="name-travel">
                            {{ info.name }}
                        </p>
                    </td>
                    <td class="wrapper-info content-description">
                        {{ info.description }}
                    </td>
                    <td class="wrapper-info content-data">
                        {{ info.startDate }}
                    </td>
                    <td class="wrapper-info content-data">
                        {{ info.endDate }}
                    </td>
                    <td class="wrapper-info">
                        <p class="price">
                            {{ info.price }}€ 
                            <span class="space">/</span>
                            <i class="bi bi-person-fill"></i>
                        </p>
                    </td>
                    <td v-if="!listBooking" class="wrapper-info">
                        <Reviews 
                            :max="5"
                            :current="Number(info.reviews)"
                        />
                    </td>
                    <td v-if="listBooking" class="wrapper-info">
                        {{ info.payment }}
                    </td>
                    <td v-if="listBooking" class="wrapper-info">
                        {{ info.notes }}
                    </td>
                    <td class="wrapper-info content-button-action">
                        <div class="btn-group" v-if="showAction">
                            <button 
                                type="button" 
                                class="btn btn-light dropdown-toggle" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                            <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <button 
                                        type="button"
                                        @click="
                                        $emit('editTravel', info),
                                        $emit('toggleModal')"
                                        class="btn btn-light button-action"
                                    >
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button" 
                                        class="btn btn-light button-action delete-button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#delete-modal"
                                        @click="
                                        $emit('shoModaleDelete', info.id)"
                                    > 
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div v-if="showAdd"
                            class="form-check">
                                <button
                                type="button"
                                class="btn button-add btn-success"
                                @click="$emit('dataTravel', 'first', info)"
                            > 
                            <i class="bi bi-plus-circle"></i>
                            </button>
                          </div>
                    </td>
                </tr>
              </template>
            </tbody>
        </table>
        <div 
        class="content-message-no-item"
        :class="{'swov-message' :!item.length}">
            <p v-if="!isSearch"
                class="fs-3">There are no trips, try to create some</p>
            <p v-else 
                class="fs-3">No results for "{{ isSearch }}", try another city
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../scss/index.scss';

    .table-responsive {
        .table {
            border-collapse: separate; 
            border-spacing: 0 rem(8);
            .dropdown-toggle {
                &::after {
                    content: none;
                }
            }
    
            .wrapper-info {
                padding-top: rem(4);
                padding-bottom: rem(4);
                border-bottom: rem(1) solid #8d8d8d;
                &:not(.content-button-action) {
                    min-width: rem(120);
                }
    
    
                &.content-description {
                    min-width: rem(260);
                }
    
                &.content-button-action {
                    text-align: right;
                }
            }
    
            .content-image {
                width: rem(100);
                height: rem(100);
                padding: 0;
                .image-travel {
                    width: 100%;
                    height: 100%;
                    border-radius: rem(16);
                    overflow: hidden;
                    object-fit: cover;
                }
            }
    
            .dropdown-menu {
                border: 0;
                padding: 0;
    
                .button-action {
                    width: 100%;
                    border-radius: 0;
                    text-align: left;
                }
            }
        
            .name-travel {
                text-transform: capitalize;
            }
        
            .button-add {
                @include font-size-line-weight(24, 24);
            }
        }

        .content-message-no-item {
           text-align: center;
           margin-top: rem(64);
           display: none;

           &.swov-message {
            display: block;
           }
        }
    }
</style>
