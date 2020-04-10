<template>
    <div>
        <p>Показать программы подготовки для:</p>
        <button type="button" 
                :class="'btn mr-1 mb-1' + (filter == 'бакалавриат' ? ' btn-danger' : ' btn-outline-danger')"
                @click="filter = 'бакалавриат'; clearSelect()"
                >Бакалавриат/специалитет</button>
        <button type="button" 
                :class="'btn mr-1 mb-1' + (filter == 'магистратура' ? ' btn-danger' : ' btn-outline-danger')"
                @click="filter = 'магистратура'; clearSelect()"
                >Магистратура</button>
        <button type="button" 
                :class="'btn mr-1 mb-1' + (filter == 'аспирантура' ? ' btn-danger' : ' btn-outline-danger')"
                @click="filter = 'аспирантура'; clearSelect()"
                >Аспирантура</button>
        <button type="button"
                class="btn btn-outline-danger mb-1"
                v-if="filter"
                @click="clearAll">Сбросить фильтр</button>
        <hr />
        <p>Выберите интересующее Вас направление подготовки из списка ниже. Обратите внимание на наличие вступительных испытаний и уровень образования (Вы можете выбрать уровень образования программы подготовки сверху).</p>

        <div v-for="(program, i) in programs"
            :key="i"
            class="mb-4">
            <div v-if="(program.level == filter ||
                       filter == null) &&
                       (selectedProgram == null ||
                       selectedProgram == i)"
                 class="card">
                <div class="card-header custom-control custom-radio">
                    <input type="radio"
                        name="educationProgram"
                        class="custom-control-input" 
                        :id="'ep'+program.id"
                        :value="program.id"
                        :checked="selectedProgram != null"
                        @change="
                                selectedProgram = i;
                                $parent.$data.data.educationProgram = program
                                ">
                    <label class="custom-control-label ml-3"
                        :for="'ep'+program.id">
                            <h5 class="mb-0">{{program.code}} - {{program.name}}</h5>
                        </label>
                </div>
                <div class="card-body row">
                    <div class="col-sm-12 col-md-6">
                        <p class="mb-1"><strong>Уровень образования:</strong> {{program.level}}</p>
                        <p><strong>Форма обучения:</strong> {{program.type.toLowerCase()}}</p>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <p class="mb-1"><strong>
                            Вступительные испытания
                            <span v-if="program.level=='бакалавриат'"> (ЕГЭ/внутренний экзамен)</span>
                            :</strong> {{program.level != 'бакалавриат' ? 'внутренний экзамен по направлению подготовки' : ''}}
                        </p>
                        <ol v-if="program.level == 'бакалавриат'">
                            <li v-for="(examId, i) in program.exams"
                                :key="i">
                                {{exams[examId].name}}
                            </li>
                        </ol>
                    </div>
                    <a class="col-12"
                       v-if="program.link"
                       :href="program.link"
                       target="_blank">Подробнее</a>
                </div>
            </div>
        </div>

        <div class="text-center">
            <button type="button"
                    class="btn btn-outline-danger"
                    v-if="selectedProgram != null"
                    @click="clearSelect">Отменить выбор</button>
        </div>
    </div>
</template>

<script>
import programs from '../Data/programs.json';
import exams from '../Data/exams.json';

export default {
    data () {
        return {
            filter: null,
            programs: programs,
            exams: exams,
            selectedProgram: null
        }
    },

    methods: {
        clearAll () {
            this.filter = null;
            this.clearSelect();
        },
        clearSelect () {
            this.selectedProgram = null;
            this.$parent.$data.data.educationProgram = {};
            this.clearCurrentEducation();
        },
        clearCurrentEducation () {
            this.$parent.$data.data.currentEducation = {
                level: null,
                exam: null,
                file: null
            }
        }
    },

    created() {
        if (Object.keys(this.$parent.$data.data.educationProgram).length > 0) {
            this.programs.find((program, i) => {
                if (program.code == this.$parent.$data.data.educationProgram.code) {
                    this.selectedProgram = i;
                }
            });
        }
    }
}
</script>