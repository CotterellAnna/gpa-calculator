$(function(){
    // generate the table on submit of number fo courses form
    $("#courses-form").submit(function(e){
        // prevent the page from refreshing on submit
        e.preventDefault()
        // get value of number of courses
        let noOfCourses = $("#noCourses").val()
        // serial number for the table
        let count = 0
        // variable to hold table body content html
        let tableContent = ""
        for(let i = 0; i < noOfCourses; i++){
            count ++
            tableContent += `
                <tr>
                    <th scope="row">${count}</th>
                    <td><input type="text" class="course-code w-100 text-center" required></td>
                    <td><input type="number" class="units w-100 text-center" required></td>
                    <td><input type="number" name="score" class="score w-100 text-center" required></td>
                    <td><input type="text" name="grade" class="grade w-100 border-0 text-center" readonly></td>
                </tr>
            `
        }
        // append table body content to the dom
        $("tbody").html(tableContent)
        if($("tbody").html() != ""){
            $("#calculate-btn, #clear-btn").attr("disabled", false)
        }else{
            $("#calculate-btn, #clear-btn").attr("disabled", true)
        }
    })
    // function to generate grades
    function gradeGenerator(x){
        let grade
        if(x >= 70 && x <= 100){
            grade = "A"
        }else if(x >= 60 && x <= 69){
            grade = "B"
        }else if(x >= 50 && x <= 59){
            grade = "C"
        }else if(x >= 45 && x <= 49){
            grade = "D"
        }else if(x >= 0 && x <= 44){
            grade = "F"
        }else{
            return "Invalid"
        }
        return grade
    }

    // function to generate grade point
    function gradePoint(x){
        let gradePoint
        if(gradeGenerator(x) == "A"){
            gradePoint = 5
        }else if( gradeGenerator(x) == "B"){
            gradePoint = 4
        }else if( gradeGenerator(x) == "C"){
            gradePoint = 3
        }else if( gradeGenerator(x) == "D"){
            gradePoint = 2
        }else if( gradeGenerator(x) == "F"){
            gradePoint = 1
        }else{
            return "Invalid"
        }
        return gradePoint
    }
    
    // function to calculate gpa
    function calculateGpa(){
        let totalPointsGotten = 0
        let totalUnits = 0
        // printing grade in grade cell for each score
        $(".score").each(function(){
            let score = $(this).val()
            let gp = gradePoint(score)
            let units = $(this).parent().prev().find(".units").val()
            let gradeEl = $(this).parent().next().find(".grade")
            gradeEl.val(gradeGenerator(score))
            // calculate points gotten per course adn adding it
            totalPointsGotten += gp*units
        })
        // calculating total numbe rof units taken
        $(".units").each(function(){
            totalUnits += Number($(this).val())
        })
        const gpa = totalPointsGotten / totalUnits
        let summary = `
        <h4 class = "fw-bold">Summary</h4>
        <p>Total units: ${totalUnits}</p>
        <p>Total points acquired: ${totalPointsGotten}</p>
        <p><span class="fw-bold">GPA</span>: ${gpa.toFixed(2)}</p>
        `
        $("#summary").html(summary)
    }

    // calculate gpa on click of "calculate-btn"
    $("#calculate-btn").click(function(){
        let inputs = $("tbody").find("input").not(".grade")
        let value
        inputs.each(function(){
            if($(this).val() == ""){
                $(this).css("border-color", "red")
                value = false
            }else{
                $(this).css("border-color", "#767676")
                value = true
            }
        })

        if(value == true){
            calculateGpa()
        }
    })

    // empty all cells in the table and remove summary on click of "clear-btn"
    $("#clear-btn").click(function(){
        let inputs = $("tbody").find("input")
        inputs.each(function(){
            $(this).val("")
            $(this).css("border-color", "#767676")
        })
        $("#summary").html("")
    })
})