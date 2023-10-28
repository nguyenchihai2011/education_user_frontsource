<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-row class="d-flex justify-end">
          <v-col cols="8">
            <v-card class="ma-8" flat>
              <div class="text-h5 font-weight-bold">Checkout</div>
              <div class="text-h6">Payment method</div>
              <v-radio-group v-model="radioGroup" @change="changePayment()">
                <v-radio :key="1" :value="1">
                  <template v-slot:label>Payment with Paypal</template>
                </v-radio>
                <v-radio :key="2" :value="2">
                  <template v-slot:label>Payment with Other</template>
                </v-radio>
              </v-radio-group>
              <div class="text-h6 my-2">Order details</div>
              <v-row>
                <v-col v-if="isBuyNow" cols="12">
                  <v-row>
                    <v-col cols="3" class="pr-0">
                      <v-img contain :src="courseBuyNow.imageUrl"></v-img>
                    </v-col>
                    <v-col cols="6"
                      ><div class="font-weight-bold">
                        {{ courseBuyNow.name }}
                      </div></v-col
                    >
                    <v-col cols="3">
                      <div class="font-weight-bold">
                        {{ courseBuyNow.price }} USD
                      </div>
                      <!-- <div class="text-decoration-line-through">
                        <u>đ</u>1,090,000
                      </div> -->
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="grey lighten-4">
        <v-row>
          <v-col cols="6">
            <v-card class="ma-8" flat color="transparent">
              <div class="text-h6 mt-16 mb-4">Summary</div>
              <div class="d-flex justify-space-between mb-2">
                <div>Original Price:</div>
                <div>{{ originalPrice }} USD</div>
              </div>
              <!-- <div class="d-flex justify-space-between">
                <div>Discounts:</div>
                <div>- <u>đ</u>1,090,000</div>
              </div> -->
              <v-divider class="mt-2 mb-4"></v-divider>
              <!-- <v-btn
                class="purple white--text text-none"
                height="44"
                width="100%"
              >
                Complete Checkout
              </v-btn> -->
              <div v-if="isPaymentPaypal" id="paypal-button-container"></div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { addOrder } from "@/api/order";
export default {
  data() {
    return {
      radioGroup: 0,
      isPaymentPaypal: false
    };
  },

  computed: {
    ...mapGetters("buy", ["isBuyNow", "courseBuyNow"]),
    ...mapGetters("auth", ["studentId"]),
    originalPrice() {
      if (this.isBuyNow) {
        return this.courseBuyNow.price;
      }
      return 0;
    }
  },

  methods: {
    changePayment() {
      if (this.radioGroup === 1) {
        this.isPaymentPaypal = true;
      } else {
        this.isPaymentPaypal = false;
      }
    }
  },

  // mounted() {
  //   paypal
  //     .Buttons({
  //       createOrder: function(data, actions) {
  //         // Tạo đơn hàng khi người dùng bấm nút thanh toán
  //         console.log(this.originalPrice);
  //         return actions.order.create({
  //           purchase_units: [
  //             {
  //               amount: {
  //                 value: this.originalPrice // Giá trị cần thanh toán
  //               }
  //             }
  //           ]
  //         });
  //       },
  //       onApprove: function(data, actions) {
  //         // Xác nhận đơn hàng sau khi thanh toán thành công
  //         return actions.order.capture().then(function(details) {
  //           // Thực hiện các hành động cần thiết sau khi thanh toán thành công
  //           console.log(
  //             "Transaction completed by " + details.payer.name.given_name
  //           );
  //         });
  //       }
  //     })
  //     .render("#paypal-button-container");
  // },

  updated() {
    if (this.isPaymentPaypal) {
      let originalPrice = this.originalPrice;
      let studentId = this.studentId;
      let orderDetailsDTO = [this.courseBuyNow].map(item => {
        return { courseId: item.id, price: item.price };
      });
      paypal
        .Buttons({
          createOrder: function(data, actions) {
            // Tạo đơn hàng khi người dùng bấm nút thanh toán

            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: originalPrice + 99 // Giá trị cần thanh toán
                  }
                }
              ]
            });
          },
          onApprove: function(data, actions) {
            // Xác nhận đơn hàng sau khi thanh toán thành công
            return actions.order.capture().then(function(details) {
              // Thực hiện các hành động cần thiết sau khi thanh toán thành công
              const payload = {
                payment: "Paypal",
                totalPrice: originalPrice,
                createAt: "2023-10-25T17:40:12.134Z",
                studentId: studentId,
                orderDetailsDTO: orderDetailsDTO
              };
              addOrder(payload).then(res => {
                console.log("success");
              });
              console.log(
                "Transaction completed by " + details.payer.name.given_name
              );
            });
          }
        })
        .render("#paypal-button-container");
    }
  }
};
</script>
