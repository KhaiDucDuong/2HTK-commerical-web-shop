import { lazy } from "react";

const ShopInfor = () => {
  return (
    <div class="">
    <table width="100%" class="table table-bordered">
        <tr>
            <td class="col-xs-4 user-img" rowspan="4">
                        <img src="../../images/NO_IMG.png"/>
            </td>

            <td id="info-row" class="col-xs-4" colspan="1">
                <h2 class="user-name">Ten Shop</h2>
            </td>

        </tr>
        <tr >
            <td id="info-row" class="col-xs-8" colspan="2">
                    <p class="user-id h3">Shop ID: 123123</p>
                <p class="user-email">Email: trantien@gmail.com</p>
            </td>
        </tr>
        <tr>
            <td id="info-row" class="col-xs-8 borderless-top borderless-bottom" colspan="2">
                <p class="user-infor">Shop Infor</p>
            </td>
        </tr>
        <tr>
            <td id="info-row" class="col-xs-4" colspan="1">
                <div class="">
                    <span class="user-records">Liked: 44</span>
                    <span class="lnr lnr-heart vector-symbol"></span>
                </div>
            </td>
            <td id="info-row" class="col-xs-4" colspan="1">
                <div class="">
                    <span class="user-records">Products:69</span>
                </div>
            </td>
        </tr>
    </table>
    </div>
  );
};

export default ShopInfor;
