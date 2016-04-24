// d3.csv("web/data/languages.csv",function(d){
			
// 	d["Year"]=+d["Year"];
// 	d["name_lc"]=d["Name"].toLowerCase();

// 	return d;

// },function(data){

	// var programming_languages={};
	// data.forEach(function(lang){
	// 	programming_languages[lang["name_lc"]]=lang["Year"];
	// })

	var selectYear="2016";
	var selectSegment = 2;
	var arrUniversityInfo=[];
	var segment1= [];
	var segment2= [];
	var segment3= [];
	var segment4= [];
	var segment5= [];
	var segmentInfo = [segment1,segment2,segment3,segment4,segment5];

	var dataSchema = {
			// programming_languages:programming_languages,
			container:"#pc",
			scale:"linear",
			columns:["university_name","teaching","international","research","citations","total_score","student_staff_ratio","world_rank"],//"international_students"],

			ref:"university_name",
			title_column:"university_name",
			// scale_map:{
			// 	"year":"linear",
			// 	"name":"ordinal",
			// 	"name2":"ordinal",
			// 	"created":"ordinal",
			// 	"CreateEvent":"ordinal",
			// 	"PushEvent":"ordinal",
			// 	"PushEventAll":"ordinal",
			// 	"PushEventRepo":"ordinal",
			// 	"active_repos_by_url":"ordinal",
			// 	"events_per_repo":"ordinal",
			// 	"lang_usage":"ordinal",
			// 	"sum_rep_size":"ordinal",
			// 	"ForkEvent":"ordinal",
			// 	"IssuesEvent":"ordinal",
			// 	"WatchEvent":"ordinal"
			// },
			scale_map:{
				// "year":"linear",
				"university_name":"ordinal",
				// "name2":"ordinal",
				"teaching":"ordinal",
				"international":"ordinal",
				"research":"ordinal",
				"citations":"ordinal",
				"total_score":"ordinal",
				// "num_students":"ordinal",
				"student_staff_ratio":"ordinal",
				"world_rank":"linear"
				// "international_students":"ordinal"
			},
			use:{
				"university_name":"total_score"
			},
			sorting:{
				"world_rank":d3.descending
			},
			// formats:{
			// 	"year":"d"
			// },
			dimensions:["university_name","teaching","total_score","international","research","citations","total_score","student_staff_ratio","world_rank"],//,"international_students"],
			column_map:{
				"university_name":["University","Name"],
				"teaching":"Teaching",
				"international":"International",
				"research":"Research",
				"citations":["Citations"],
				"total_score":["Total","Score"],
				// "num_students":["Number Of","Students"],
				"student_staff_ratio":["Student Staff","Ratio"],
				"world_rank":["World","Rank"]
				// // "international_students":["International","Students"]
			},
			help:{
				"university_name":"<h4>University Name</h4>University Name<br/>Ordered by activity rank.",
				"teaching":"<h4>Teaching</h4>Teaching Score of the university.",
				"international":"<h4>International</h4>International score.",
				"research":"<h4>Research</h4>Research Score",
				"citations":"<h4>Citations</h4>Citation Score.",
				"total_score":"<h4>Total Score</h4>Total Score of University",
				// "num_students":"<h4>Number of Students</h4>Number of Students of the university.",
				"student_staff_ratio":"<h4>Students VS Staff Ratio</h4>Students numbers vs staff numbers ratio.",
				"world_rank":"World Rank of University."
				// "international_students":"<h4>International Students</h4>International students proportion."
			},
			duration:1,
			path:"data/",
			extension:"csv"
		};

	function AynalyseUniversityInfo(selectYear, selectSegment){

		d3.csv("data/"+selectYear+".csv",function(q){
			return q;
		},function(data){
			for (var i = 0; i < data.length; i++) {
	            	var n = Math.floor(i/25);
	            	// console.log(n);
	            	var j = Math.round(i%25);
					// console.log(j);
	                segmentInfo[n][j]= data[i];
	            }
		
			pc=new ParallelCoordinates(segmentInfo[selectSegment],dataSchema);

		});

	}

	d3.select("#year_select")
			.selectAll("a")
			.data(["2011","2012","2013","2014","2015","2016"])
			.on("click",function(d){
				d3.event.preventDefault();
				d3.selectAll("#year_select a")
					.classed("selected",false);
				d3.select(this).classed("selected",true);
			
			selectYear =d;
			// updateScales();
                document.getElementById('pc').innerHTML="";
			AynalyseUniversityInfo(selectYear, selectSegment);
			})
			.on("mouseover",function(d){
				d3.selectAll("#sm_select span.visible")
					.classed("visible",false)
				d3.select("#sm_select")
					.selectAll("span[rel="+d+"]")
					.classed("visible",true)
			});
	
	AynalyseUniversityInfo(selectYear, selectSegment);


