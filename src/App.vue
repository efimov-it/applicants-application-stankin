<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark stankin-bg">
      <div class="container">
          <a class="navbar-brand" href="https://stankin.ru" title="На главную">МГТУ Станкин</a>
          <span class="navbar-text">Предварительное заявление абитуриента</span>
      </div>
    </nav>
    <br />
    <div class="container">
      <div class="step-wrapper">
        <StepCard v-for="(step, i) in this.steps"
                  :key="i"
                  :number="i + 1"
                  :isActive="step.isActive"
                  :text="step.text" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3>
            {{this.steps.find(step => step.isActive).text}}
          </h3>
        </div>

        <div class="card-body">
          <div class="page-carusel">
            <PersonalData     v-if="this.steps[0].isActive" />

            <EducationProgram v-if="this.steps[1].isActive" />

            <CurrentEducation v-if="this.steps[2].isActive" />

            <CheckApplication v-if="this.steps[3].isActive"
                              :data="data" />
          </div>
        </div>

        <div class="card-footer text-right">
          <button type="button"
                  class="btn btn-secondary mr-1 mb-1"
                  v-if="!this.steps[0].isActive"
                  @click="lastStep"
                  >Предыдущий шаг</button>
          <button type="button"
                  class="btn btn-danger mr-1 mb-1"
                  v-if="!this.steps[this.steps.length - 1].isActive"
                  @click="nextStep"
                  >Следующий шаг</button>
          <button type="button"
                  class="btn btn-danger mr-1 mb-1"
                  v-if="this.steps[this.steps.length - 1].isActive"
                  @click="sendData"
                  >Отправить заявление</button>
        </div>
      </div>
      <br />
      <p class="text-center">
        © {{(new Date()).getFullYear()}} ФГБОУ ВО "МГТУ "СТАНКИН"<br />
        Адрес: 127055, Москва, Вадковский пер.,1<br />
        Тел: <a href="tel:+74999733076">(499) 973-30-76</a>, <a href="tel:+74999733066">(499) 973-30-66</a><br />
        Факс: <a htef="fax:+74999733167">(499) 973-31-67</a>
      </p>
    </div>
  </div>
</template>

<script>
import StepCard from './components/step-card';

import PersonalData from './pages/personal-data';
import EducationProgram from './pages/education-program';
import CurrentEducation from './pages/current-education';
import CheckApplication from './pages/check-application';

export default {
  name: 'App',
  components: {
    StepCard,
    PersonalData,
    EducationProgram,
    CurrentEducation,
    CheckApplication
  },
  data () {
    return {
      steps: [
        {
          isActive: true,
          text: 'Личные данные'
        },
        {
          isActive: false,
          text: 'Направление подготовки'
        },
        {
          isActive: false,
          text: 'Текущее образование'
        },
        {
          isActive: false,
          text: 'Проверка заявления'
        }
      ],
      currentEducation : [
        'Основное общее (9 классов)',
        'Среднее общее (11 классов)',
        'Среднее профессиональное',
        'Бакалавриат',
        'Специалитет',
        'Магистратура',
        'Ординатура'
      ],
      marks : [
        'Свидетельство ОГЭ (после 9 классов)',
        'Свидетельство ЕГЭ',
        'Вступительные испытания ОУ'
      ],
      data: {
        personalData: {
          name: null,
          fam: null,
          otch: null,
          bDate: null,
          document: {
              personalDocument: 5,
              citizenship: 0,
              serialNumber: null,
              number: null,
              date: null,
              unitCode: null
          },
          address: {
              region: null,
              district: null,
              town: null,
              street: null,
              building: null,
              flat: null,
              postalCode: null
          },
          phone: null,
          email: null
        },
        educationProgram: {},
        currentEducation: {
          level: null,
          exam: null,
          file: null
        }
      }
    }
  },

  methods: {
    lastStep () {
      this.steps.find((step, i) => {
        if (step.isActive) {
          step.isActive = false;
          this.steps[i - 1].isActive = true;
        }
      });
    },

    nextStep () {
      let currentPage = 0;
      this.steps.find((step, i) => {
        if (step.isActive) {
          currentPage = i;
        }
      });
      this.steps[currentPage].isActive = false;
      this.steps[currentPage + 1].isActive = true;
    },
    sendData () {
      console.log(this.data);
    }
  }
}
</script>

<style lang="scss" scoped>
.stankin-bg {
  background-color: #9d0c1e;
}

a {
  color: #9d0c1e;
}

.step-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & > div {
    flex-basis: 25%;
  }
}
</style>