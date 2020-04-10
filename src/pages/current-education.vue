<template>
    <div>
        <div v-if="Object.keys($parent.$data.data.educationProgram).length != 0"
             class="row">
            <div class="col-sm-12 col-md-6">
                <p><strong>Текущее образование:</strong></p>
                <div class="custom-control custom-radio"
                        v-for="(el, i) in educationLevels"
                        :key="i">
                    <input type="radio"
                        name="currentEducation"
                        class="custom-control-input" 
                        :id="'currentEducation' + i"
                        :value="i"
                        v-model="isSelectLevel"
                        @click="$parent.$data.data.currentEducation.level = el.name;"
                        v-if="el.level.indexOf($parent.$data.data.educationProgram.level) >= 0">
                    <input type="radio"
                        name="currentEducation"
                        class="custom-control-input" 
                        :id="'currentEducation' + i"
                        :value="i"
                        v-else
                        disabled>
                    <label class="custom-control-label" :for="'currentEducation' + i">{{el.name}}</label>
                </div>
            </div>
            
            <div v-if="isSelectLevel != null" class="col-sm-12 col-md-6">
                <p><strong>Основание для оценки:</strong></p>
                    <div class="custom-control custom-radio"
                         v-for="(el, i) in educationLevels[isSelectLevel].exams"
                         :key="i">
                        <input type="radio"
                               name="exam"
                               class="custom-control-input" 
                               :id="'exam' + i"
                               :value="i"
                               v-model="isSelectExam"
                               @click="$parent.$data.data.currentEducation.exam = el">
                        <label class="custom-control-label" :for="'exam' + i">{{el}}</label>
                    </div>
            </div>

            <div v-if="isSelectLevel != null" class="col-12 mt-3">
                <p class="mb-1"><strong>Дополнительные файлы:</strong></p>
                <p>Пожалуйста, загрузите отсканированные копии {{educationLevels[isSelectLevel].document}}.</p>
                <div class="custom-file">
                    <input type="file"
                           class="custom-file-input"
                           id="customFile"
                           accept="application/pdf"
                           @change="fileChange($event)">
                    <label class="custom-file-label" for="customFile">{{$parent.$data.data.currentEducation.file == null ? 'Откройте файл в формате pdf' : $parent.$data.data.currentEducation.file.name}}</label>
                </div>
            </div>
        </div>

        <div v-else class="text-center">
            <h5>Пожалуйста, выберите программу подготовки прежде чем приступить к этому шагу.</h5>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isSelectLevel: null,
            isSelectExam: null,
            educationLevels: [
                {
                    name: 'Среднее общее (11 классов)',
                    level: 'бакалавриат',
                    document: 'атестата о среднем общем образовании',
                    exams: [
                        'Результаты ЕГЭ'
                    ]
                },
                {
                    name: 'Среднее профессиональное (колледж)',
                    level: 'бакалавриат',
                    document: 'диплома о среднем профессиональном образовании',
                    exams: [
                        'Результаты ЕГЭ',
                        'Внутренние вступительные испытания'
                    ]
                },
                {
                    name: 'Высшее (бакалавриат/специалитет)',
                    level: 'бакалавриат магистратура',
                    document: 'диплома бакалавра/специалиста',
                    exams: [
                        'Внутренние вступительные испытания'
                    ]
                },
                {
                    name: 'Высшее (магистратура)',
                    level: 'бакалавриат магистратура аспирантура',
                    document: 'диплома магистра',
                    exams: [
                        'Внутренние вступительные испытания'
                    ]
                }
            ],
            file: null
        }
    },

    methods: {
        fileChange (e) {
            this.$parent.$data.data.currentEducation.file = e.target.files[0];
        }
    },

    created () {
        this.educationLevels.find ((level, i) => {
            if (this.$parent.$data.data.currentEducation.level == level.name) {
                this.isSelectLevel = i;

                level.exams.find ((exam, j) => {
                    if (this.$parent.$data.data.currentEducation.exam == exam) {
                        this.isSelectExam = j;
                    }
                });
            }
        });
    }
}
</script>

<style scoped>
.custom-file-label::after{
  content: "Открыть";
}
</style>