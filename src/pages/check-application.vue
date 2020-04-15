<template>
    <div>
        <h5>Персональные данные:</h5>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <strong>ФИО:</strong>
                {{  data.personalData.fam && data.personalData.name ?
                    data.personalData.fam + ' ' + data.personalData.name + ' ' + (data.personalData.otch ? data.personalData.otch : '') :
                    'Пожалуйста, заполните Ваши имя и фамилию'
                }}
            </div>
            
            <div class="col-sm-12 col-md-6">
                <strong>Дата рождения:</strong>
                {{(new Date(data.personalData.bDate)).toLocaleDateString() ? (new Date(data.personalData.bDate)).toLocaleDateString() : 'Пожалуйста, укажите дату вашего рождения'}}
            </div>
        </div>
        <hr />

        <h5>Документ удостоверяющий личность:</h5>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <p><strong>Тип документа:</strong>
                   {{data.personalData.document.personalDocument ? $root.data.personalDocuments[data.personalData.document.personalDocument].name : 'Пожалуйста, укажите тип документа удостоверяющего личность'}}</p>
            </div>
            
            <div class="col-sm-12 col-md-6">
                <p><strong>Гражданство:</strong>
                   {{data.personalData.document.citizenship >= 0 ? citizenship[data.personalData.document.citizenship].name : 'Пожалуйста, укажите ваше гражданство'}}</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <p><strong>Серия и номер документа:</strong>
                   {{data.personalData.document.serialNumber & data.personalData.document.number ? data.personalData.document.serialNumber + " " + data.personalData.document.number : 'Пожалуйста, укажите серию и номер документа удостоверяющего личность'}}</p>
            </div>
            
            <div class="col-sm-12 col-md-6">
                <p><strong>Дата выдачи:</strong>
                   {{data.personalData.document.date ? (new Date(data.personalData.document.date)).toLocaleDateString() : 'Пожалуйста, укажите дату выдачи документа'}}</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-12">
                <strong>Код подразделения:</strong>
                {{data.personalData.document.unitCode ? data.personalData.document.unitCode : 'Пожалуйста, укажите код подразделения, выдавшего документ'}}
            </div>
        </div>
        <hr />
        
        <h5>Адрес проживания (прописка):</h5>
        <div>
            <p>
                {{
                    data.personalData.document.citizenship >= 0 &&
                    data.personalData.address.region &&
                    data.personalData.address.town &&
                    data.personalData.address.street &&
                    data.personalData.address.building ?

                    citizenship[data.personalData.document.citizenship].name + ', ' +
                    data.personalData.address.region + ', ' +
                    (data.personalData.address.district ? 
                    data.personalData.address.district + ', ' : '') +
                    data.personalData.address.town + ', ' +
                    data.personalData.address.street + ', ' +
                    data.personalData.address.building +
                    (data.personalData.address.flat ?
                    ', ' + data.personalData.address.flat : '') :

                    'Пожалуйста, укажите Ваш адрес проживания'
                }}
            </p>
            
            <p>
                <strong>Почтовый индекс:</strong>
                {{data.personalData.address.postalCode ? data.personalData.address.postalCode : 'Пожалуйста укажите Ваш почтовый индекс'}}
            </p>
        </div>
        <hr />
        
        <h5>Контактные данные:</h5>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <p><strong>Номер телефона:</strong>
                    {{data.personalData.phone ? data.personalData.phone : 'Пожалуйста, укажите Ваш номер телефона'}}
                   </p>
            </div>
            
            <div class="col-sm-12 col-md-6">
                <p><strong>Адрес электронной почты:</strong>
                    {{data.personalData.email ? data.personalData.email : 'Пожалуйста, укажите Ваш адрес электронной почты'}}
                   </p>
            </div>
        </div>
        <hr />
        
        <h5>Направление подготовки и текущее образование:</h5>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <p>
                    <strong>
                        {{data.educationProgram.code ? data.educationProgram.code : 
                          'Пожалуйста, укажите интересующую Вас программу подготовки'
                        }}
                    </strong>
                    {{data.educationProgram.name ? ' - ' + data.educationProgram.name : ''}}
                </p>
            </div>
            
            <div class="col-sm-12 col-md-6" v-if="data.educationProgram.code">
                <p><strong>Уровень образования:</strong>
                {{data.educationProgram.level ? data.educationProgram.level: ''}}</p>
            </div>
        </div>
        
        <div class="row" v-if="data.educationProgram.code">
            <div class="col-sm-12 col-md-6">
                <p><strong>Форма обучения:</strong>
                {{data.educationProgram.type ? data.educationProgram.type: ''}}</p>
            </div>
            
            <div class="col-sm-12 col-md-6">
                <p><strong>Вступительные испытания:</strong>
                    <ol>
                        <li v-for="(exam, i) in data.educationProgram.exams"
                            :key="i">{{exams[exam].name}}</li>
                    </ol>
                </p>
            </div>
        </div>
        
        <div class="row" v-if="data.educationProgram.code">
            <div class="col-sm-12 col-md-6">
                <p>
                    <strong>Текущее образование:</strong>
                    {{data.currentEducation.level ? data.currentEducation.level: 'Пожалуйста, укажите Ваше текущее образование'}}
                </p>
            </div>
            
            <div class="col-sm-12 col-md-6">
                <p>
                    <strong>Основание для оценки:</strong>
                    {{data.currentEducation.exam ? data.currentEducation.exam: 'Пожалуйста, укажите основание для оценки'}}
                </p>
            </div>
        </div>

        <div class="row" v-if="data.educationProgram.code">
            <div class="col-sm-12 col-md-6">
                <p>
                    <strong>Прикреплённый файл:</strong>
                    {{data.currentEducation.file ? data.currentEducation.file.name: '[Не выбран]'}}
                </p>
            </div>
        </div>
        <hr />
        <VueReCaptcha />
        <div class="alert alert-danger">
            Внимательно проверьте заполнение всех полей на наличие ошибок и соответствие паспортным данным.<br />
            После отправки заявления отредактировать его будет невозможно.
        </div>
    </div>
</template>

<script>
import citizenship from '../Data/citizenship';
import exams from '../Data/exams';
export default {
    props: ['data'],
    data () {
        return {
            citizenship: citizenship,
            exams: exams
        }
    }
}
</script>