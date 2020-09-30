<template>
  <van-popup
    v-model="selfVisible"
    get-container="body"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <template>
      <div class="form">
        <div class="form-item">
          <span class="form-item-label">名称：</span>
          <div class="form-item-content">
            <input v-model="name" class="form-input name" />
          </div>
        </div>
        <div class="form-item">
          <span class="form-item-label">日期：</span>
          <div class="form-item-content">
            <van-datetime-picker
              v-model="date"
              type="date"
              :show-toolbar="false"
              class="date-picker"
            ></van-datetime-picker>
          </div>
        </div>
        <div class="form-item">
          <span class="form-item-label">备注：</span>
          <div class="form-item-content">
            <input v-model="comment" class="form-input comment" />
          </div>
        </div>
        <div class="form-item radios">
          <span class="form-item-label">重复：</span>
          <div class="form-item-content center">
            <van-radio-group
              v-model="repeat"
              direction="horizontal"
              class="radio-group"
            >
              <van-radio class="radio" name="none"
                >无
                <template #icon="props">
                  <div
                    :class="props.checked ? 'radio-checked' : 'radio-normal'"
                  ></div>
                </template>
              </van-radio>
              <van-radio class="radio" name="year"
                >年
                <template #icon="props">
                  <div
                    :class="props.checked ? 'radio-checked' : 'radio-normal'"
                  ></div>
                </template>
              </van-radio>
              <van-radio class="radio" name="month"
                >月
                <template #icon="props">
                  <div
                    :class="props.checked ? 'radio-checked' : 'radio-normal'"
                  ></div>
                </template>
              </van-radio>
              <van-radio class="radio" name="day"
                >日
                <template #icon="props">
                  <div
                    :class="props.checked ? 'radio-checked' : 'radio-normal'"
                  ></div>
                </template>
              </van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="form-operation">
          <van-button class="form-button" @click="selfVisible = false">
            <van-icon class="form-button-icon" name="arrow-left" />
          </van-button>
          <van-button class="form-button" @click="submit">
            <van-icon class="form-button-icon" name="plus" />
          </van-button>
        </div>
      </div>
    </template>
  </van-popup>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "AddDay",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selfVisible: false,
      name: "",
      date: dayjs().toDate(),
      comment: "",
      repeat: "none",
    };
  },
  watch: {
    visible(val) {
      this.selfVisible = val;
    },
    selfVisible(val) {
      this.$emit("update:visible", val);
    },
  },
  methods: {
    submit() {
      if (this.name) {
        this.$emit("add", {
          name: this.name,
          comment: this.comment,
          date: dayjs(this.date).format("YYYY-MM-DD"),
          repeat: this.repeat,
        });
        this.selfVisible = false;
        return;
      }
      this.$dialog.alert({
        message: "请填写名称",
      });
    },
  },
};
</script>
<style scoped>
.form {
  width: 100%;
  height: calc(100% - 20px);
  padding-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: var(--black);
  color: var(--white);
}
.form-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}
.form-item.radios {
  padding-top: 20px;
}
.form-item-label {
  width: 80px;
  text-align: center;
  font-size: 20px;
}
.form-item-content {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.form-item-content.center {
  padding-top: 5px;
  justify-content: center;
}
.form-operation {
  padding-top: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.form-input {
  width: calc(100% - 40px);
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid;
  color: var(--white);
  font-size: 28px;
  border-radius: 0;
  margin-right: 18px;
}
.form-input.name {
  border-color: var(--orange);
}
.form-input.comment {
  border-color: var(--green);
}
.radio-group {
  width: 80%;
  justify-content: space-around;
}
/deep/ .radio .van-radio__label {
  color: var(--white);
}
/deep/ .radio-normal {
  background-color: var(--white);
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
/deep/ .radio-checked {
  border: 1px solid var(--white);
  background-color: var(--radio-checked);
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
.form-button {
  border: none;
  background: none;
  height: 36px;
}
.form-button-icon {
  font-size: 22px;
  color: var(--white);
}

.date-picker {
  flex: 1;
  background-color: var(--black);
  color: var(--white);
  font-size: 16px;
}

/deep/ .van-picker-column__item {
  background-color: var(--black);
  color: var(--gray);
}
/deep/ .van-picker-column__item--selected {
  color: var(--red);
}
/deep/ [class*="van-hairline"]::after {
  border-color: var(--red);
  border-width: 2px;
  border-left: none;
  border-right: none;
}
/deep/ .van-picker__mask {
  background: none;
  /* background-image: linear-gradient(
      180deg,
      hsla(100, 100%, 0%, 0.9),
      hsla(0, 0%, 100%, 0.4)
    ),
    linear-gradient(0deg, hsla(0, 0%, 2%, 0.9), hsla(0, 0%, 100%, 0.4)); */
}
</style>
