'use strict';
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest directives.Chart
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module directive
 * @requires _
 */

var _ = require('underscore');

module.exports = function(d3Service) {

  return {
    restrict: 'A',
    scope: {
      chartData: "=",
      dataNamespace: "@namespace"
    },
    link: function(scope, element, attrs) {

      var svg;

      var margin = {top: 20, right: 20, bottom: 30, left: 70},
        width = window.outerWidth - margin.left - 30 - margin.right,
        height = 500 - margin.top - margin.bottom;

      /**
       * Init d3Service
       */
      d3Service.d3().then(function (d3) {
        require('d3-tip')(d3);
        svg = d3.select(element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        scope.$watch('chartData', function (newValue) {
          if (svg) {
            scope.render(newValue);
          }
        });

        scope.render(scope.chartData);
      });

      /**
       * @description render the chart table
       * @param data {object}
       */
      scope.render = function (data) {

        if (!data.length || !d3) {
          return;
        }

        svg.selectAll('*').remove();

        data = _.filter(data, function(_data) {
          return typeof _data[scope.dataNamespace] != 'undefined';
        });

        var x = d3.scale.ordinal()
          .domain(d3.range(data.length))
          .rangeRoundBands([0, width], .1);

        var maxValue = d3.max(data, function (_data) {
          return +_data[scope.dataNamespace][0].value;
        });

        var y = d3.scale.linear()
          .domain([0, maxValue])
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .tickSize(1)
          .tickFormat('')
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickSize(1);

        var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            var tipData = d[scope.dataNamespace][0];
            var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
            return  "<strong>Date:</strong> <span style='color:red'>" + dateFormat(new Date(tipData.timestamp)) + "</span><br/>" +
              "<strong>Value:</strong> <span style='color:red'>" + tipData.value + "</span><br/>";
          });

        svg.call(tip);

        svg.selectAll("rect")
          .data(data, function (d) {
            return d[scope.dataNamespace][0].value;
          })
          .enter()
          .append("rect")
          .attr("x", function(d, i) {
            return x(i);
          })
          .attr("y", function(d) {
            return y(type(d));
          })
          .attr("width", x.rangeBand())
          .attr("height", function(d) {
            return height-y(type(d));
          })
          .attr("fill", function(d) {
            var color = parseInt(type(d) / maxValue * 255) + 100;
            return "rgb(" + 66 + "," + 99 + "," + color + ")";
          })
          .on("mouseover", tip.show)
          .on("mouseout", tip.hide);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .text("Date")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        function type(d) {
          return d[scope.dataNamespace][0].value;
        }
      }
    }
  }
};