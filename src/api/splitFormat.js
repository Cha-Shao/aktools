var tabstr = ""; //头上选项卡
var checkedtag = [];
var stars = ["1", "2", "3", "4", "5", "6"];
var longtag = {};
var kg_avatar = 1;
var kg_star = 0;
var kg_fgkzm = 0;

$.each(tags, function (k, v) {
  if (v.name != "星级") {
    $.each(v.cntags, function (k1, v1) {
      longtag[k1] = v1;
    });
  }
});

//添加选项卡
$.each(tags, function (index, el) {
  tabstr += '<div class="list"><p>' + el.name + "</p>";
  if (el.name == "星级") {
    $.each(el.cntags, function (k, v) {
      if (v != "全部") {
        tabstr +=
          '<span data-type="' +
          k +
          '" class="startype level' +
          k +
          ' active">' +
          v +
          "</span>";
      } else {
        tabstr +=
          '<span data-type="' +
          k +
          '" class="starall level' +
          k +
          ' active">' +
          v +
          "</span>";
      }
    });
  } else {
    $.each(el.cntags, function (k, v) {
      tabstr +=
        '<span data-type="' + k + '" class="othertype">' + v + "</span>";
    });
  }
  tabstr += "</div>";
});
$(".tab").html(tabstr);

//点击信息
$("body").on("click", ".check .l", function (event) {
  if ($(this).hasClass("active")) {
    var state = 0;
    $(this).removeClass("active");
  } else {
    var state = 1;
    $(this).addClass("active");
  }
  if ($(this).hasClass("avatar")) {
    kg_avatar = state;
    changeAvatar();
  } else if ($(this).hasClass("star")) {
    if (state) {
      $(".starall").removeClass("active");
      //还需要去掉一星两星
      var r = stars.indexOf("1");
      if (r != -1) {
        stars.splice(r, 1);
        $(".tabbox .level1").removeClass("active");
      }
      var r = stars.indexOf("2");
      if (r != -1) {
        stars.splice(r, 1);
        $(".tabbox .level2").removeClass("active");
      }
    } else {
      //需要加上一星两星
      var r = stars.indexOf("1");
      if (r == -1) {
        stars.push("1");
        $(".tabbox .level1").addClass("active");
      }
      var r = stars.indexOf("2");
      if (r == -1) {
        stars.push("2");
        $(".tabbox .level2").addClass("active");
      }
      //判断是否为6个
      if (stars.length == 6) {
        $(".starall").addClass("active");
      }
    }
    changefinal();
  } else if ($(this).hasClass("fgkzm")) {
    kg_fgkzm = state;
    changefinal();
  }
});

//切换星星
$("body").on("click", ".starall", function (event) {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(".startype").removeClass("active");
    stars = [];
  } else {
    $(this).addClass("active");
    $(".startype").addClass("active");
    stars = ["1", "2", "3", "4", "5", "6"];
  }
  changefinal();
});

// 显示星级
$("body").on("click", ".startype", function (event) {
  var l = $(this).attr("data-type");
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    var r = stars.indexOf(l);
    stars.splice(r, 1);
    if (stars.length <= 5) {
      $(".starall").removeClass("active");
    }
  } else {
    $(this).addClass("active");
    stars.push(l);
    if (stars.length >= 6) {
      $(".starall").addClass("active");
    }
  }
  changefinal();
});

//切换选项卡
$("body").on("click", ".othertype", function (event) {
  if (!$(this).hasClass("active")) {
    if (checkedtag.length >= 6) {
      alert("最多只能同时选择 6 个词条噢！");
      return false;
    } else {
      $(this).addClass("active");
      checkedtag.push($(this).attr("data-type"));
    }
  } else {
    $(this).removeClass("active");
    var l = checkedtag.indexOf($(this).attr("data-type"));
    checkedtag.splice(l, 1);
  }
  changefinal();
});

//重置
$("body").on("click", ".chongzhi", function (event) {
  stars = ["1", "2", "3", "4", "5", "6"];
  checkedtag = [];
  $(".starall").addClass("active");
  $(".startype").addClass("active");
  $(".othertype").removeClass("active");
  $(".res").html("");
});

$("#image-select").change(function (event) {
  var filedom = document.querySelector("input[type=file]");
  var file = filedom.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (ev) {
    $.ajax({
      url: "../html/img.php",
      type: "POST",
      data: { img: ev.target.result },
      success: function (res) {
        console.log(res);
      },
    });
  };
});

$("body").on("click", ".hero span", function (event) {
  var id = $(this).attr("data-id");
  $(".touxiang").html('<img src="images/avatar/' + id + '.png">');
  $(".name").html(hero[id]["name"]);
  var tag = "";
  tag +=
    '<span class="hdetailstar hdetailstar' +
    hero[id]["star"] +
    '">★×' +
    hero[id]["star"] +
    "</span>";
  tag += "<span>" + longtag[hero[id]["position"]] + "</span>";
  tag += "<span>" + longtag[hero[id]["profession"]] + "</span>";
  $.each(hero[id]["tags"], function (k, v) {
    tag += "<span>" + longtag[v] + "</span>";
  });
  $(".tag").html(tag);
  $(".msk,.herodetail").fadeIn("400");
});

//点击关闭
$(".msk,.close").click(function (event) {
  $(".msk,.herodetail").fadeOut("400");
});

function getsame(arrs) {
	// arrs去掉第一个
  var arr = arrs.shift();
	// arrs循环
  for (var i = arrs.length; i--; ) {
    var p = { boolean: {}, number: {}, string: {} },
      obj = [];
		// arr是过滤后的arrs[i]
    arr = arr.concat(arrs[i]).filter(function (x) {
			// t 当前元素的值 类型
      var t = typeof x;
			// t是否 Boolean number string
      return !(t in p
				// 是 返回 p <类型> <当前值> 或赋值为1
        ? !p[t][x] && (p[t][x] = 1)
				// 否 obj是否包含x 否则加入x
        : obj.indexOf(x) < 0 && obj.push(x));
    });
		// 如果arr无长
    if (!arr.length) return null;
  }
  return arr;
}

function changefinal() {
  $(".res").html("");
	// 如果没有选中任何tag
  if (checkedtag.length == 0) {
    return;
  }
  if (stars.length <= 0) {
    return;
  }
	// 选中多少个tag
  var len = checkedtag.length;
	// 循环次数
  var count = Math.pow(2, len);
	// 初始化可能的结果
  var combs = [];
  for (var i = 0; i < count; i++) {
    var ts = [];
    for (var j = 0, mask = 1; j < len; j++) {
      if ((i & mask) !== 0) {
        ts.push(checkedtag[j]);
        // console.log(checkedTags[j]);
      }
      mask = mask * 2;
    }
    if (ts.length > 0 && ts.length <= 3) {
      combs.push(ts);
    }
  }
  var finalstr = "";
  var i = 1;
	// 遍历combs k1是索引值 v1是tag内容
  $.each(combs, function (k1, v1) {
		// 初始化临时Array
    var tmparr = [];
		// 遍历tag内容 (['治疗', '远程位']) k2索引值 v2：'治疗' | '远程位'
    $.each(v1, function (k2, v2) {
			// temparr增加v2属性的干员
      tmparr.push(taghero[v2]);
    });
		// 过滤相同
    var tmpres = getsame(tmparr);
    if (tmpres) {
			// 渲染tag 值 索引值 循环次数
      appebndtag(tmpres, v1, i);
      i++;
    }
  });
}
function appebndtag(arr, arr2, num) {
  var box = "";
  var h = "";
  var str = "";
  var state = 0;
  if (arr) {
    var box = '<div class="list"><p>' + num + '</p><div class="citiao">';
    var state = isInArray(arr2, "102");
    $.each(arr2, function (k, v) {
      box += "<span>" + longtag[v] + "</span>";
    });
    box += "</div>";
    box += '<div class="hero">';
    $.each(arr, function (k, v) {
      if (isInArray(stars, hero[v]["star"])) {
        if (!state && hero[v]["star"] == 6) {
        } else {
          if (kg_fgkzm || hero[v]["recruitment"] == 1) {
            state = 1;
          }
          h +=
            '<span class="level' +
            hero[v]["star"] +
            (kg_avatar ? " has-avatar" : "") +
            (kg_fgkzm ? " has-fgkzm" : "") +
            (hero[v]["recruitment"] == 0 ? " fgkzm" : "") +
            '" data-id="' +
            v +
            '">';
          h += '<img src="images/avatar/' + v + '.png">';
          h += "<em>" + hero[v]["name"] + "</em>";
          h += hero[v]["recruitment"] == 0 ? "<i></i>" : "";
          h += "</span>";
        }
      }
    });
    if (h && state) {
      str = box + h + "</div></div>";
      $(".res").append(str);
    }
  }
}
function isInArray(arr, val) {
  var testStr = "," + arr.join(",") + ",";
  return testStr.indexOf("," + val + ",") != -1;
}
function changeAvatar() {
  if (kg_avatar) {
    $(".hero span").addClass("has-avatar");
  } else {
    $(".hero span").removeClass("has-avatar");
  }
}
function changeFgkzm() {
  if (kg_fgkzm) {
    $(".hero span").addClass("has-fgkzm");
  } else {
    $(".hero span").removeClass("has-fgkzm");
  }
}
