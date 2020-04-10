<template>
    <div :class="'step-card' + (this.isActive ? ' active' : '')">
        <h2>Шаг {{this.number}}</h2>
        <hr />
        <span>{{this.text}}</span>
    </div>    
</template>

<script>
export default {
    props: ['number', 'isActive', 'text']
}
</script>

<style lang="scss" scoped>
    .step-card {
        padding: 0px 10px;
        text-align: center;

        h2, span {
            color: #AFAFAF;
        }

        span, hr {
            transition: all .3s;
        }

        hr {
            height: 5px;
            width: 100%;
            background-color: #AFAFAF;
            border-radius: 2.5px;
            margin: 5px 0px;
        }

        &.active {
            h2 {
                color: #41020A;
            }

            hr {
                background-color: #9D0C1E;
            }
        }
    }
</style>