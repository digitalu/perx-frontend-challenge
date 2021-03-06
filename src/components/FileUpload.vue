<template>
  <div class="page">
    <h1>
      File Upload
    </h1>
    <section class="section">
      <el-upload
        action=""
        class="el-upload"
        accept=".csv"
        drag
        v-loading="loading"
        :auto-upload="false"
        :limit="1"
        :onChange="handleOnChange"
        :on-remove="handleOnRemove">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <div class="el-upload__tip" slot="tip">.csv files only</div>
      </el-upload>
    </section>

    <section class="section" v-show="file">
      <h2>Verify Data</h2>
      <p>
        Select the correct columns to display on Google Maps.
      </p>

      <el-row class="verify-data">
        <el-col :span="12">
          <div v-for="item in data.slice(0,1)">
            <div class="verify-data__item">
              {{item[0]}}
            </div>
            <div class="verify-data__item">
              {{item[1]}}
            </div>
            <div class="verify-data__item">
              {{item[2]}}
            </div>
            <div class="verify-data__item">
              {{item[3]}}
            </div>
            <div class="verify-data__item">
              {{item[4]}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="verify-data__item">
            <el-select v-model="columns.col0" placeholder="Select">
              <el-option
                v-for="item in columnNames"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="verify-data__item">
            <el-select v-model="columns.col1" placeholder="Select">
              <el-option
                v-for="item in columnNames"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="verify-data__item">
            <el-select v-model="columns.col2" placeholder="Select">
              <el-option
                v-for="item in columnNames"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="verify-data__item">
            <el-select v-model="columns.col3" placeholder="Select">
              <el-option
                v-for="item in columnNames"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="verify-data__item">
            <el-select v-model="columns.col4" placeholder="Select">
              <el-option
                v-for="item in columnNames"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-alert
          title="Please make sure that all columns are selected and unique."
          type="error"
          v-show="!isValid">
        </el-alert>
        <el-button type="primary" @click="verifyData">Verify Data</el-button>
      </el-row>
    </section>
    <section class="section section__map">
      <h2>Locations</h2>
      <google-map name="address-map" :addresses="addressesWithGeolocation"></google-map>
    </section>
  </div>
</template>

<script>
import Papa from 'papaparse';
import axios from 'axios';
import GoogleMap from './GoogleMap'

const MAXIMUM_ROWS = 20;

export default {
  name: 'FileUpload',
  components: {
    GoogleMap
  },
  data() {
    return {
      data: [],
      file: '',
      isValid: true,
      loading: false,
      columns: {
        col0: 'city',
        col1: 'state',
        col2: 'zip',
        col3: 'address',
        col4: 'category',
      },
      columnNames: ['city', 'state', 'zip', 'address', 'category'],
      addresses: [],
      addressesWithGeolocation: []
    };
  },
  methods: {
    handleFile(options) {
      // doesn't do anything.
      //
    },
    handleOnChange(file) {
      //let reader = new FileReader();
      file.status = 'success';
      this.file = file;
      let data = '';

      // Parse file
      // display data and let the user choose which column is which
      // upon confirmation of data, need to get long/lat of address
      // then find unique categories
      // assign categories to colors
      // then display on map
      Papa.parse(file.raw, {
        preview: MAXIMUM_ROWS,
        complete: this.parseData
      });
    },
    handleOnRemove(res, file) {
      this.data = [];
      this.addresses = [];
      this.addressesWithGeolocation = [];
      this.file = '';
    },
    parseData(response) {
      this.data = response.data
    },
    verifyData() {
      let selectedColumns = [];

      for (let key in this.columns) {
        selectedColumns.push(this.columns[key]);
      }
      // check to make sure all values are unique and not empty
      this.isValid = selectedColumns.filter((v,i,a) =>  a.indexOf(v) === i && v !== '').length === 5 ? true : false;

      if (this.isValid) {
        this.createAddresses();
      }
    },
    createAddresses() {
      let key = this.$googleApiKey,
        googleApiPromises;

      for (let item of this.data) {
        let address = {};
        address[this.columns['col0']] = item[0];
        address[this.columns['col1']] = item[1];
        address[this.columns['col2']] = item[2];
        address[this.columns['col3']] = item[3];
        address[this.columns['col4']] = item[4];
        address['fullAddress'] = `${address.address}, ${address.city}, ${address.state} ${address.zip}`;
        address['location'] = '';
        this.addresses.push(address);
      }

      googleApiPromises = this.addresses.map(address => {
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: address.fullAddress,
            key: key
          }
        }).then(response => {
          if (response.data.status === 'OK') {
            // get first result only
            address.location = response.data.results[0].geometry.location;
          }
        })
      })
      axios.all(googleApiPromises).then(() => this.addressesWithGeolocation = this.addresses )
    }
  }
};
</script>
<style lang="scss">
  .el-upload {
    display: flex;
    flex-direction: column;
  }
  .el-upload-dragger {
    width: 100%;
  }
  .el-upload-list__item-name {
    text-align: left;
  }
  .verify-data {
    max-width: 320px;
  }
  .verify-data__item {
    height: 40px;
    margin: 20px 0;
    display: flex;
    align-items: center;
  }
</style>
