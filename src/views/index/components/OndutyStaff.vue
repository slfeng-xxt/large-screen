<script setup></script>

<template>
  <div class="staff">
    <img src="@/assets/images/title/title-onduty.png" alt="staff info" />
    <div class="staff__info">
      <div class="staff__info-position">值班经理</div>
      <div class="staff__info-desc">
        <span class="staff-name">张三</span>
        <span class="staff-line"></span>
        <img src="@/assets/images/staff/staff-phone.png" alt="phone logo" />
        <span class="staff-phone">152 1622 2865</span>
      </div>
    </div>
    <div class="qtyn-line"></div>
    <div class="staff__total">
      <div class="total-box">
        <!-- 巡检人员 -->
        <div class="total-box__item">
          <div class="total-box__item-icon">
            <img
              class="item-icon-img"
              src="@/assets/images/staff/staff-inspection.png"
              alt="staff item"
            />
          </div>
          <div class="total-box__item-info">
            <div class="total-box__item-info-value">3 人</div>
            <div class="total-box__item-info-title">巡检人员</div>
          </div>
        </div>
        <!--电工-->
        <div class="total-box__item">
          <div class="total-box__item-icon">
            <img
              class="item-icon-img"
              src="@/assets/images/staff/staff-electrician.png"
              alt="staff item"
            />
          </div>
          <div class="total-box__item-info">
            <div class="total-box__item-info-value">3 人</div>
            <div class="total-box__item-info-title">电工</div>
          </div>
        </div>
        <!-- 司机 -->
        <div class="total-box__item">
          <div class="total-box__item-icon">
            <img
              class="item-icon-img"
              src="@/assets/images/staff/staff-dirver.png"
              alt="staff item"
            />
          </div>
          <div class="total-box__item-info">
            <div class="total-box__item-info-value">3 人</div>
            <div class="total-box__item-info-title">司机</div>
          </div>
        </div>
        <!-- 运营人员 -->
        <div class="total-box__item">
          <div class="total-box__item-icon">
            <img
              class="item-icon-img"
              src="@/assets/images/staff/staff-operation.png"
              alt="staff item"
            />
          </div>
          <div class="total-box__item-info">
            <div class="total-box__item-info-value">3 人</div>
            <div class="total-box__item-info-title">运营人员</div>
          </div>
        </div>
      </div>
    </div>
    <div class="qtyn-line"></div>
  </div>
</template>

<style lang="less" scoped>
.staff {
  img {
    width: 100%;
  }

  &__info {
    position: relative;
    height: 52px;
    margin: 0 auto;
    margin-top: 12px;
    background-image: url('@/assets/images/staff/staff-desc-bg.png');
    background-size: 100% 100%;

    &-position {
      position: absolute;
      left: 57px;
      top: 0;
      width: 200px;
      height: 20px;
      line-height: 20px;
      color: #b7b7b7;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      letter-spacing: 1.4px;
      z-index: 12;
    }

    &-desc {
      position: absolute;
      display: flex;
      align-items: center;
      left: 57px;
      top: 14px;
      height: 38px;
      flex-shrink: 0;
      line-height: 38px;
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 1.6px;
      z-index: 13;

      .staff-name {
        white-space: nowrap;
      }
      .staff-line {
        width: 2px;
        height: 12px;
        margin: 0 12px;
        border-radius: 9999px;
        background: #69503e;
      }

      img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }

      .staff-phone {
        white-space: nowrap;
      }
    }
  }

  &__total {
    width: 100%;
  }

  .total-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__line {
      position: absolute;
      top: -1px;
      right: 0;
      width: 15px;
      height: 2px;
      flex-shrink: 0;
      background: #00ffe9;
    }

    &__item {
      display: flex;
      align-items: center;
      width: 129px;
      height: 48px;
      padding: 6px;
      flex-shrink: 0;
      border: 0.8px solid #68788d;

      &:nth-child(1) {
        margin-bottom: 16px;
      }
      &:nth-child(2) {
        margin-bottom: 16px;
      }

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        padding: 6px;
        flex-shrink: 0;
        border: 0.6px solid #7b8f9f;
        background: rgba(62, 74, 91, 0.5);
        backdrop-filter: blur(2.5714285373687744px);

        img {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          pointer-events: none;
        }
      }

      &-info {
        width: 100%;
        margin-left: 16px;

        &-value {
          color: #00ffea;
          text-align: center;
          font-family: 'Alibaba PuHuiTi 2.0';
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 3.2px;
        }

        &-title {
          color: #78b3a7;
          text-align: center;
          font-family: 'Alibaba PuHuiTi 2.0';
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 2.4px;
        }
      }
    }
  }
}
</style>
