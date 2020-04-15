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

    <div :class="'modal fade' + (modal.shown ? ' shown' : '')"
         :style="'opacity: 1;'+(modal.shown ? 'display: block;' : '')">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">{{modal.title}}</h5>
            <button type="button" class="close" @click="this.closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-html="modal.text" />
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="this.closeModal">Отмена</button>
            <button
                    type="button"
                    class="btn btn-danger"
                    @click="this.callModalCallback"
                    >{{modal.okText ? modal.okText : 'ОК'}}</button>
          </div>
        </div>
      </div>
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
      },
      modal : {
        shown: false,
        title: '',
        text: '',
        okText: '',
        callback: null
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

    showModal (title, text, okText, callback) {
      this.modal.title = title;
      this.modal.text = text;
      this.modal.okText = okText;
      this.modal.callback = callback;

      this.modal.shown = true;
    },

    callModalCallback () {
      if (this.modal.callback) {
        this.modal.callback();
      }
      else {
        this.closeModal();
      }
    },

    closeModal () {
      this.modal.shown = false;
    },

    sendData () {
      if (!this.data.personalData.name                  ||
          !this.data.personalData.fam                   ||
          !this.data.personalData.bDate                 ||
          !this.data.personalData.document.serialNumber ||
          !this.data.personalData.document.number       ||
          !this.data.personalData.document.date         ||
          !this.data.personalData.document.unitCode     ||
          !this.data.personalData.address.region        ||
          !this.data.personalData.address.town          ||
          !this.data.personalData.address.street        ||
          !this.data.personalData.address.building      ||
          !this.data.personalData.address.postalCode    ||
          !this.data.personalData.phone                 ||
          !this.data.personalData.email                 ||
          !this.data.educationProgram.code              ||
          !this.data.currentEducation.exam              ||
          !this.data.currentEducation.file              ||
          !this.data.currentEducation.level
      ) {
        return this.showModal('Ошибка заполнения',
                               'Не все обязательные поля были заполнены. Пожалуйста, проверьте все поля отмеченные звёздочкой (*) и повторите попытку снова.',
                               'Понятно');
      }
      else {
        this.showModal('Отправка зяавления',
                       'Если вы уверены в том, что заявление заполнено корректно, нажмите кнопку отправить. Помните, что после отправки заявления внести корректировки будет невозможно.<br /><br />Отправляя заявление, вы соглашаетесь с <a href="#" title="Просьба предоставить перечень документов для добавления их на форму">[перечень документов]</a>',
                       'Отправить',
                       ()=>{
                         console.log('Пока обрабатывающий заявку backend не готов, данные для заявления выводятся в консоль\n',this.data);
                       });
      }
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