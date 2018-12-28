<template>
<div class="row">

  <!-- 菜单 -->
  <div class="col-sm-12 col-md-8">
    <table class="table">
      <thead class="thead-default">
        <tr>
          <th>尺寸</th>
          <th>价格</th>
          <th>加入购物车</th>
        </tr>
      </thead>
      <tbody v-for="item in getMenuItems" :key="item.name">
        <tr>
          <td><strong>{{item.name}}</strong></td>
        </tr>
        <tr v-for="option in item.options" :key="option.size">
          <td>{{option.size}}</td>
          <td>{{option.price}}</td>
          <td><button @click="addToBasket(item,option)" class="btn btn-sm btn-outline-success">+</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 购物车 -->
  <div class="col-sm-12 col-md-4">
    <div v-if="baskets.length>0">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <td>数量</td>
            <td>品种</td>
            <td>价格</td>
          </tr>
        </thead>
        <tbody v-for="item in baskets" :key="item.option">
          <tr>
            <td>
              <button class="btn btn-sm" @click="decrease(item)">-</button>
              <span>{{item.quantity}}</span>
              <button class="btn btn-sm" @click="increase(item)">+</button>
            </td>
            <td>{{item.name}}{{item.size}}</td>
            <td>{{item.price*item.quantity}}</td>
          </tr>
        </tbody>
      </table>
      <p>总价：{{total+"RMB"}}</p>
      <button class="btn btn-success btn-block">提交</button>
    </div>
    <div v-else>{{basketText}}</div>

  </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      //getMenuItems:[],
      baskets: [],
      basketText: "购物车没有商品"
    }
  },
  computed: {
    total() {
      let totalCost = 0;
      for (let index in this.baskets) {
        let item = this.baskets[index];
        totalCost += item.quantity * item.price;

      }
      return totalCost
    },
    getMenuItems() {
      return this.$store.getters.getMenuItems
    }
  },
  created() {
    axios.get('/menu.json')
      .then(result => this.$store.commit("setMenuItems", result.data))
  },
  methods: {
    addToBasket(item, option) {
      let basket = {
        name: item.name,
        size: option.size,
        price: option.price,
        quantity: 1

      }
      if (this.baskets.length > 0) {
        let result = this.baskets.filter(basket => {
          return (basket.name === item.name && basket.size === option.size)
        })
        if (result != null && result.length > 0) {
          result[0].quantity++
        } else {
          this.baskets.push(basket);
        }
      } else {
        this.baskets.push(basket);
      }

    },
    decrease(item) {
      item.quantity--
      if (item.quantity <= 0) {
        this.remobeFromBasket(item)
      }
    },
    increase(item) {
      item.quantity++
    },
    remobeFromBasket(item) {
      this.baskets.splice(this.baskets.indexOf(item), 1)
    }

  }
}
</script>

<style>

</style>
