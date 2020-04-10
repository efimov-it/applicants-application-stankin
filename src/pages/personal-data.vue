<template>
    <div>
        <p>Будьте внимательны при заполнении формы личных данных. Поля отмеченные знаком звёздочка (*) обязательны для заполнения.</p>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="form-group">
                    <label for="fam">*Фамилия абитуриента:</label>
                    <input type="text"
                           class="form-control"
                           id="fam"
                           v-model="$parent.$data.data.personalData.fam"
                           required/>
                </div>
                <div class="form-group">
                    <label for="name">*Имя абитуриента:</label>
                    <input type="text"
                           class="form-control"
                           id="name"
                           v-model="$parent.$data.data.personalData.name"
                           required/>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group">
                    <label for="otch">Отчество абитуриента:</label>
                    <input type="text"
                           class="form-control"
                           id="otch"
                           v-model="$parent.$data.data.personalData.otch" />
                </div>
                <div class="form-group">
                    <label for="bDate">*Дата рождения:</label>
                    <input type="date"
                           class="form-control"
                           id="bDate"
                           v-model="$parent.$data.data.personalData.bDate"
                           required/>
                </div>
            </div>
        </div>
        <hr />
        
        <strong>Документ удостоверяющий личность:</strong>
        <div class="row">
            <div class="form-group col-sm-12 col-md-6">
                <label for="personalDocument">*Тип документа:</label>
                <select class="form-control" id="personalDocument" v-model="$parent.$data.data.personalData.document.personalDocument">
                    <option v-for="(doc, i) in this.personalDocuments"
                            :key="i"
                            :value="doc.value">
                            {{doc.name}}
                    </option>
                </select>
            </div>

            <div class="form-group col-sm-12 col-md-6">
                <label for="citizenship">*Гражданство:</label>
                <select class="form-control" id="citizenship" v-model="$parent.$data.data.personalData.document.citizenship">
                    <option v-for="(cit, i) in this.citizenship"
                            :key="i"
                            :value="cit.id">
                            {{cit.name}}
                    </option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-sm-12 col-md-6">
                <label for="serialNumber">*Серия документа:</label>
                <input type="number"
                       class="form-control"
                       id="serialNumber"
                       placeholder="XXXX"
                       v-model="$parent.$data.data.personalData.document.serialNumber"
                       required/>
            </div>

            <div class="form-group col-sm-12 col-md-6">
                <label for="number">*Номер документа:</label>
                <input type="number"
                       class="form-control"
                       id="number"
                       placeholder="XXXXXX"
                       v-model="$parent.$data.data.personalData.document.number"
                       required/>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-sm-12 col-md-6">
                <label for="dateOfDocument">*Дата выдачи:</label>
                <input type="date"
                       class="form-control"
                       id="dateOfDocument"
                       v-model="$parent.$data.data.personalData.document.date"
                       required/>
            </div>

            <div class="form-group col-sm-12 col-md-6">
                <label for="unitCode">*Кем выдан:</label>
                <input type="text"
                       class="form-control"
                       id="unitCode"
                       v-model="$parent.$data.data.personalData.document.unitCode"
                       required/>
            </div>
        </div>
        <hr />

        <strong>Адрес проживания (прописка):</strong>

        <div class="row">
            <div class="form-group col-sm-12 col-md-6">
                <label for="region">*Регион:</label>
                <input type="text"
                       class="form-control"
                       id="region"
                       placeholder="Название региона или города федерального значения"
                       v-model="$parent.$data.data.personalData.address.region"
                       required />
            </div>
            
            <div class="form-group col-sm-12 col-md-6">
                <label for="district">Район:</label>
                <input type="text"
                       class="form-control"
                       id="district"
                       placeholder="Название района"
                       v-model="$parent.$data.data.personalData.address.district" />
            </div>
        </div>

        <div class="row">
            <div class="form-group col-sm-12 col-md-6">
                <label for="town">*Населённый пункт (город, село и т.д.):</label>
                <input type="text"
                       class="form-control"
                       id="town"
                       placeholder="Название населённого пункта"
                       v-model="$parent.$data.data.personalData.address.town"
                       required />
            </div>
            
            <div class="form-group col-sm-12 col-md-6">
                <label for="street">*Улица:</label>
                <input type="text"
                       class="form-control"
                       id="street"
                       placeholder="Название улицы"
                       v-model="$parent.$data.data.personalData.address.street"
                       required />
            </div>
        </div>

        <div class="row">
            <div class="form-group col-sm-12 col-md-6">
                <label for="building">*Номер дома:</label>
                <input type="text"
                       class="form-control"
                       id="building"
                       placeholder="Номер дома"
                       v-model="$parent.$data.data.personalData.address.building"
                       required />
            </div>
            
            <div class="form-group col-sm-12 col-md-6">
                <label for="flat">Квартира:</label>
                <input type="text"
                       class="form-control"
                       id="flat"
                       placeholder="Номер квартиры"
                       v-model="$parent.$data.data.personalData.address.flat" />
            </div>
        </div>

        <div class="row">
            <div class="form-group col-sm-12 col-md-6">
                <label for="postalcode">*Почтовый индекс:</label>
                <input type="text"
                       class="form-control"
                       id="postalcode"
                       v-model="$parent.$data.data.personalData.address.postalCode"
                       required />
            </div>
        </div>
        <hr />

        <strong>Контактные данные:</strong>

        <div class="row">
            <div class="form-group col-sm-12 col-md-6">
                <label for="phone">*Номер телефона:</label>
                <input type="text"
                       class="form-control"
                       id="phone"
                       placeholder="+XXX (XXX) XXX-XX-XX"
                       v-model="$parent.$data.data.personalData.phone"
                       required />
            </div>
            
            <div class="form-group col-sm-12 col-md-6">
                <label for="email">*Адрес электронной почты:</label>
                <input type="text"
                       class="form-control"
                       id="email"
                       placeholder="exemple@mail.com"
                       v-model="$parent.$data.data.personalData.email"
                       required />
            </div>
        </div>
    </div>
</template>

<script>
import citizenship from '../Data/citizenship';
import personalDocuments from '../Data/personalDocuments'

export default {
    data () {
        return {
            personalDocuments: personalDocuments,
            citizenship: citizenship
        }
    },

    updated () {
        //$parent.$data.data.personalData = this.data;
    }
}
</script>

<style lang="scss" scoped>

</style>

