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
      <div v-if="!this.applicationIsDone" class="step-wrapper">
        <StepCard v-for="(step, i) in this.steps"
                  :key="i"
                  :number="i + 1"
                  :isActive="step.isActive"
                  :text="step.text"
                  v-on:click.native="selectStep(i)" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3>
            {{this.applicationIsDone ? 'Результат подачи заявления' : this.steps.find(step => step.isActive).text}}
          </h3>
        </div>

        <div class="card-body">
          <div class="page-carusel">
            <PersonalData     v-if="this.steps[0].isActive && !this.applicationIsDone" />

            <EducationProgram v-if="this.steps[1].isActive && !this.applicationIsDone" />

            <CurrentEducation v-if="this.steps[2].isActive && !this.applicationIsDone" />

            <CheckApplication v-if="this.steps[3].isActive && !this.applicationIsDone"
                              :data="data" />

            <Result v-if="this.applicationIsDone" />
          </div>
        </div>

        <div class="card-footer text-right">
          <div v-if="!this.applicationIsDone">
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
          <div v-if="this.applicationIsDone">
            <a class="btn btn-danger mr-1 mb-1"
               role="button"
               style="color: #ffffff"
               href="https://stankin.ru/">Вернуться на главную</a>
          </div>
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
import Result from './pages/result';

export default {
  name: 'App',
  components: {
    StepCard,
    PersonalData,
    EducationProgram,
    CurrentEducation,
    CheckApplication,
    Result
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
      },
      applicationIsDone: false
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

    selectStep (index) {
      this.steps.find((step, i) => {
        if (step.isActive) {
          if(index != i) {
            step.isActive = false;
            this.steps[index].isActive = true;
          }
        }
      });
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
      const context = this;
      function errorMessageField (text) {
        return context.showModal('Ошибка заполнения', text, 'Понятно');
      }

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
        return errorMessageField('Не все обязательные поля были заполнены. Пожалуйста, проверьте все поля отмеченные звёздочкой (*) и повторите попытку снова.');
      }
      else {
        // TODO: при необходимости добавить проверку корректности заполнения полей

        this.showModal('Отправка зяавления',
                       'Если вы уверены в том, что заявление заполнено корректно, нажмите кнопку отправить. Помните, что после отправки заявления внести корректировки будет невозможно.<br /><br />Отправляя заявление, вы соглашаетесь с <a href="#" title="Просьба предоставить перечень документов для добавления их на форму">[перечень документов]</a>',
                       'Отправить',
                       ()=>{
                         alert('Это beta версия заявления, введённые данные были выведены в консоль.');
                         delete this.data.educationProgram.id;
                         delete this.data.educationProgram.link;
                         this.data.educationProgram.exams.forEach(id => {
                           const examName = this.$root.$data.data.exams[id].name;
                           id = examName;
                         });
                         const documentId = this.data.personalData.document.personalDocument;
                         this.data.personalData.document.personalDocument = this.$root.$data.data.personalDocuments[documentId].name;
                         const citizenshipId = this.data.personalData.document.citizenship;
                         this.data.personalData.document.citizenship = this.$root.$data.data.citizenship[citizenshipId].name;
                         console.log('Пока обрабатывающий заявку backend не готов, данные для заявления выводятся в консоль\n\n',this.data);
                         // Тут условно отправка данных через AJAX на сервер
                         // Если всё ок, тогда
                         let requestResponse = true;
                         if (requestResponse) {
                            this.applicationIsDone = true;
                            this.closeModal();
                         }
                         else {
                           //Обработка ошибки со стороны сервера
                           alert();
                         }
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

  @media (max-width: 992px) {
    & > div {
      flex-basis: 100%;
      text-align: left;
    }
  }
}
</style>