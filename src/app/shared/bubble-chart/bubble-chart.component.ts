import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3'
import { BubbleChart } from 'src/app/utils/bubble-chart';

//declare function BubbleChart(data:any):any

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {

  @ViewChild('bubbleChart') bubbleChart: ElementRef;
  svg

  constructor() { }

  ngOnInit(): void {
    this.svg = BubbleChart();
    
  }

  files = [
     {id: "flare.analytics.cluster.AgglomerativeCluster", value: 3938},
     {id: "flare.analytics.cluster.CommunityStructure", value: 3812},
     {id: "flare.analytics.cluster.HierarchicalCluster", value: 6714},
     {id: "flare.analytics.cluster.MergeEdge", value: 743},
     {id: "flare.analytics.graph.BetweennessCentrality", value: 3534},
     {id: "flare.analytics.graph.LinkDistance", value: 5731},
     {id: "flare.analytics.graph.MaxFlowMinCut", value: 7840},
     {id: "flare.analytics.graph.ShortestPaths", value: 5914},
     {id: "flare.analytics.graph.SpanningTree", value: 3416},
     {id: "flare.analytics.optimization.AspectRatioBanker", value: 7074},
     {id: "flare.animate.Easing", value: 17010},
     {id: "flare.animate.FunctionSequence", value: 5842},
     {id: "flare.animate.interpolate.ArrayInterpolator", value: 1983},
     {id: "flare.animate.interpolate.ColorInterpolator", value: 2047},
     {id: "flare.animate.interpolate.DateInterpolator", value: 1375},
     {id: "flare.animate.interpolate.Interpolator", value: 8746},
     {id: "flare.animate.interpolate.MatrixInterpolator", value: 2202},
     {id: "flare.animate.interpolate.NumberInterpolator", value: 1382},
     {id: "flare.animate.interpolate.ObjectInterpolator", value: 1629},
     {id: "flare.animate.interpolate.PointInterpolator", value: 1675},
     {id: "flare.animate.interpolate.RectangleInterpolator", value: 2042},
     {id: "flare.animate.ISchedulable", value: 1041},
     {id: "flare.animate.Parallel", value: 5176},
     {id: "flare.animate.Pause", value: 449},
     {id: "flare.animate.Scheduler", value: 5593},
     {id: "flare.animate.Sequence", value: 5534},
     {id: "flare.animate.Transition", value: 9201},
     {id: "flare.animate.Transitioner", value: 19975},
     {id: "flare.animate.TransitionEvent", value: 1116},
     {id: "flare.animate.Tween", value: 6006},
     {id: "flare.data.converters.Converters", value: 721},
     {id: "flare.data.converters.DelimitedTextConverter", value: 4294},
     {id: "flare.data.converters.GraphMLConverter", value: 9800},
     {id: "flare.data.converters.IDataConverter", value: 1314},
     {id: "flare.data.converters.JSONConverter", value: 2220},
     {id: "flare.data.DataField", value: 1759},
     {id: "flare.data.DataSchema", value: 2165},
     {id: "flare.data.DataSet", value: 586},
     {id: "flare.data.DataSource", value: 3331},
     {id: "flare.data.DataTable", value: 772},
     {id: "flare.data.DataUtil", value: 3322},
     {id: "flare.display.DirtySprite", value: 8833},
     {id: "flare.display.LineSprite", value: 1732},
     {id: "flare.display.RectSprite", value: 3623},
     {id: "flare.display.TextSprite", value: 10066},
     {id: "flare.flex.FlareVis", value: 4116},
     {id: "flare.physics.DragForce", value: 1082},
     {id: "flare.physics.GravityForce", value: 1336},
     {id: "flare.physics.IForce", value: 319},
     {id: "flare.physics.NBodyForce", value: 10498},
     {id: "flare.physics.Particle", value: 2822}
  ]

  
}
