const degree = (rad)=> rad * Math.PI/180;

class Cube {
    constructor(order){
        if(order>10)
            throw new Error("Maximum cube size exceeded!")

        this.axisX = new THREE.Vector3(1,0,0);
        this.axisY = new THREE.Vector3(0,1,0);
        this.axisZ = new THREE.Vector3(0,0,1);
        
        this.alreadyWon=false;
        this.shuffling=false;
        this.rotating = false;
        this.editMode = true;
        this.activeEditColor = 0xff0000;
        this.order=order;
        this.pieceSize=10;
        this.blocks=[];
        this.mergeObj=[];
        this.offset= (order-1) * this.pieceSize / 2;
        for(let i=0;i<order;i++){
            let sclice=[];
            for(let j=0;j<order;j++){
                let row=[];
                for(let k=0;k<order;k++){
                    let piece ={x:i*this.pieceSize - this.offset,y:j*this.pieceSize - this.offset,z:k*this.pieceSize - this.offset};
                    row.push({...piece});
                }
                sclice.push({...row})
            }
            this.blocks.push({...sclice})
        }
        this.createPieces();
        camera.position.z = order * 25;
    }
    colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff8c00, 0xffffff]

    createPieces = ()=>{
        for(let i=0;i<this.order;i++){
            for(let j=0;j<this.order;j++){
                for(let k=0;k<this.order;k++){
                    const gap = 1.05;
                    const skinProjection = 0.17;
                    const geometryBox = new THREE.BoxGeometry(this.pieceSize,this.pieceSize,this.pieceSize );
                    const geometryFace = new THREE.PlaneGeometry(this.pieceSize * 0.85,this.pieceSize * 0.85 );
                    const materialR = new THREE.MeshStandardMaterial( {color: this.colors[0], side: THREE.DoubleSide, roughness:0.8} );
                    const materialG = new THREE.MeshStandardMaterial( {color: this.colors[1], side: THREE.DoubleSide, roughness:0.8} );
                    const materialB = new THREE.MeshStandardMaterial( {color: this.colors[2], side: THREE.DoubleSide, roughness:0.8} );
                    const materialY = new THREE.MeshStandardMaterial( {color: this.colors[3], side: THREE.DoubleSide, roughness:0.8} );
                    const materialO = new THREE.MeshStandardMaterial( {color: this.colors[4], side: THREE.DoubleSide, roughness:0.8} );
                    const materialW = new THREE.MeshStandardMaterial( {color: this.colors[5], side: THREE.DoubleSide, roughness:0.8} );
                    const materialBox = new THREE.MeshStandardMaterial( {color: 0x111111, side: THREE.DoubleSide, roughness:0.8} );
                   
                    // var modifier = new THREE.SubdivisionModifier( 3 );
                    // modifier.modify( geometryFace );

                    const faceL = new THREE.Mesh( geometryFace, materialO );
                    const faceR = new THREE.Mesh( geometryFace, materialR );
                    const faceF = new THREE.Mesh( geometryFace, materialG );
                    const faceB = new THREE.Mesh( geometryFace, materialB );
                    const faceD = new THREE.Mesh( geometryFace, materialY );
                    const faceU = new THREE.Mesh( geometryFace, materialW );
                    const box = new THREE.Mesh( geometryBox, materialBox );

                    

                    faceU.rotation.set(degree(90),0,0);
                    faceD.rotation.set(degree(90),0,0);

                    faceF.rotation.set(0,0,degree(90));
                    faceB.rotation.set(0,0,degree(90));

                    faceL.rotation.set(0,degree(90),0);
                    faceR.rotation.set(0,degree(90),0);

                    const {x,y,z} = this.blocks[i][j][k];
                    faceU.position.set(x*gap,y*gap + (this.pieceSize/2 + skinProjection) ,z*gap);
                    faceD.position.set(x*gap,y*gap - (this.pieceSize/2 + skinProjection) ,z*gap);

                    faceB.position.set(x*gap,y*gap ,z*gap - (this.pieceSize/2 + skinProjection));
                    faceF.position.set(x*gap,y*gap ,z*gap + (this.pieceSize/2 + skinProjection));

                    faceL.position.set(x*gap - (this.pieceSize/2 + skinProjection),y*gap ,z*gap);
                    faceR.position.set(x*gap + (this.pieceSize/2 + skinProjection),y*gap ,z*gap);

                    box.position.set(x*gap,y*gap ,z*gap);

                    // face.castShadow = true; //default is false
                    // face.receiveShadow = true; //default
                    const pieceGroup = new THREE.Object3D();

                    if(i==0 || j==0 || k==0 || i==(this.order - 1) || j==(this.order - 1) || k==(this.order - 1)){
                        
                        if(i==(this.order - 1))
                            pieceGroup.add( faceR );
                
                        if(i==0)
                            pieceGroup.add( faceL );
                        
                        if(j==(this.order - 1))
                            pieceGroup.add( faceU );
                        
                        if(j==0)
                            pieceGroup.add( faceD );

                        if(k==(this.order - 1))
                            pieceGroup.add( faceF );
                        
                        if(k==0)
                            pieceGroup.add( faceB );
                       
                        pieceGroup.add( box );
                        pieceGroup.name=''+i+j+k;
                        scene.add(pieceGroup);
                    }
                    this.blocks[i][j][k].piece = pieceGroup;

                }
            }
        }
       
    }

    get3DCoordinatesOfPiece = (piece)=>{
        for(let i=0;i<this.order;i++){
            for(let j=0;j<this.order;j++){
                for(let k=0;k<this.order;k++){
                    if(this.blocks[i][j][k].piece.name == piece.name)
                    return {x:i,y:j,z:k};
                }
            }
        }
    }

    rotationMatrixHelper = (i,j,direction='clockwise')=>{
        const translationOffset = (this.order-1)/2;
        // Pivot point rotation
        // Translate to -offset
        // x' = -y and y' = x;
        // Translate back to +offset
        const translatedI = i - translationOffset;
        const translatedJ = j - translationOffset;

        const rotatedI = translatedJ * (direction==='clockwise'?-1:1);
        const rotatedJ = translatedI * (direction==='clockwise'?1:-1);

        const x = rotatedI + translationOffset;
        const y = rotatedJ + translationOffset;
        return {x,y};
    }

    shuffle = (turns=10)=>{
        this.alreadyWon=false;
        this.shuffling=true;
        const timer =  setInterval(()=>{
            const rand1 = Math.floor(Math.random()*10)%this.order;
            const rand2 = Math.floor(Math.random()*10)%this.order;
            cube.rotateSclice('xyz'[rand1],rand2,'clockwise'+rand1==2?'1':'');
            turns--;
            if(turns==0) {
                clearInterval(timer);
                this.shuffling=false;
            }
        },600);
    }

    showCongrats = ()=>{
        // if(confirm("Congrats..! Do you want to shuffle?")) 
        // shuffle();
    }

    mergeSlice = ({initial=false, data})=>{
        if(initial){
            this.mergeObj= [...data];
        } else if(this.mergeObj){
            let newObj = [];
            data.forEach((slice, i)=>{
                if(slice.length==0) slice = ["1","1","1"];
                newObj.push(slice.map((e,j)=>this.mergeObj[i][j] == e ? e : "0"));
            })
            const expectedSum = data.reduce((a,e,i)=>a+i,'');
            let valid = false;
            for(let i=0;i<3;i++){ //x,y,z
                let sum ="";
                for(let j=0;j<data.length;j++){
                    sum += newObj[j][i];
                } 
                if(expectedSum.split('').every(e=>sum.includes(e))){
                    valid = true;
                }
            }
            if(!valid){
                newObj = false;
            }
            this.mergeObj = newObj;
        }
    }
    checkGameStatus = ()=>{
        // Check whether 3 sides are of same color.
        if(this.alreadyWon) return false;
        for(let i of [0, this.order-1]){
            let initial = true;
            for(let j=0;j<this.order;j++){
                let data=[];
                for(let k=0;k<this.order;k++){
                    data.push(this.blocks[i][j][k].piece.name.split(''));
                }
                this.mergeSlice({initial, data });
                initial = false;
            }
            if(!this.mergeObj){
                // not won
                return false;
            }
        }

        for(let i of [0, this.order-1]){
            let initial = true;
            for(let j=0;j<this.order;j++){
                let data=[];
                for(let k=0;k<this.order;k++){
                    data.push(this.blocks[j][k][i].piece.name.split(''));
                }
                this.mergeSlice({initial, data });
                initial = false;
            }
            if(!this.mergeObj){
                // not won
                return false;
            }
        }

        for(let i of [0, this.order-1]){
            let initial = true;
            for(let j=0;j<this.order;j++){
                let data=[];
                for(let k=0;k<this.order;k++){
                    data.push(this.blocks[i][k][j].piece.name.split(''));
                }
                this.mergeSlice({initial, data });
                initial = false;
            }
            if(!this.mergeObj){
                // not won
                return false;
            }
        }
        this.alreadyWon = true;
        return this.alreadyWon;
    }

    printSclice = (axis, index)=>{
        switch(axis){
            case 'x':
                    for(let i=0;i<this.order;i++){
                        let row='';
                        for(let j=0;j<this.order;j++){
                            row += this.blocks[index][i][j].piece.name+', ';
                        }
                        console.log(row);
                    }
            break;
            case 'y':
                    for(let i=0;i<this.order;i++){
                        let row='';
                        for(let j=0;j<this.order;j++){
                            row += this.blocks[i][index][j].piece.name+', ';
                        }
                        console.log(row);
                    }
            break;
            case 'z':
                    for(let i=0;i<this.order;i++){
                        let row='';
                        for(let j=0;j<this.order;j++){
                            row += this.blocks[i][j][index].piece.name+', ';
                        }
                        console.log(row);
                    }
            break;
        }
    }
    

    rotateSclice = (axis, index, direction,del=false) => {
        return new Promise((resolve, reject)=>{
            if(this.editMode ) return;
            if(this.rotating) {
                console.log("Already in one rotation...!");
                return;
            }
            if(index>=this.order) 
                throw new Error('Rotation not possible on this index : '+index+' because maximum size is : '+(this.order-1));
            if('xyz'.indexOf(axis)==-1)
            throw new Error('Rotation on invalid axis: '+axis);
            let dirAngle;
            let rotationAngleInterval =10;
            const tempSclice = {};
            this.rotating= true;
            switch(axis){
                case 'x':
                    dirAngle = direction==='clockwise'?1:-1;
                    for(let i=0;i<this.order;i++){
                        for(let j=0;j<this.order;j++){

                            if(del)
                            scene.remove(this.blocks[index][i][j].piece);

                            // Backing up
                            if(!tempSclice[''+i+j])
                            tempSclice[''+i+j]= this.blocks[index][i][j].piece;

                            const {x,y} = this.rotationMatrixHelper(i,j,direction=='clockwise'?'':'clockwise');
                            this.blocks[index][i][j].piece = tempSclice[''+x+y] || this.blocks[index][x][y].piece;
                        
                            let totalAngle = rotationAngleInterval;

                            const doRotationAnimation = ()=> {
                                if(totalAngle==90) {
                                    this.rotating= false;
                                    setTimeout(()=>resolve("done"), 500);
                                } else
                                requestAnimationFrame( doRotationAnimation );

                                const rotation = new THREE.Matrix4().makeRotationX(degree(rotationAngleInterval * dirAngle));
                                this.blocks[index][i][j].piece.applyMatrix(rotation);
                                totalAngle+=rotationAngleInterval;
                                };
                            doRotationAnimation();
                        }
                    }
                break;
                case 'y':
                    dirAngle = direction==='clockwise'?1:-1;
                    for(let i=0;i<this.order;i++){
                        for(let j=0;j<this.order;j++){
                            if(del)
                            scene.remove(this.blocks[i][index][j].piece);
                            // Backing up
                            if(!tempSclice[''+i+j])
                            tempSclice[''+i+j]= this.blocks[i][index][j].piece;

                            const {x,y} = this.rotationMatrixHelper(i,j,direction);
                            this.blocks[i][index][j].piece = tempSclice[''+x+y] || this.blocks[x][index][y].piece;
                        

                            let totalAngle = rotationAngleInterval;

                            const doRotationAnimation = ()=> {
                                if(totalAngle==90) {
                                    this.rotating= false;
                                    setTimeout(()=>resolve("done"), 500);
                                } else
                                requestAnimationFrame( doRotationAnimation );

                                const rotation = new THREE.Matrix4().makeRotationY(degree(rotationAngleInterval * dirAngle));
                                this.blocks[i][index][j].piece.applyMatrix(rotation);
                                    totalAngle+=rotationAngleInterval;
                                };
                            doRotationAnimation();

                        }
                    }
                break;
                case 'z':
                    dirAngle = direction==='clockwise'?1:-1;
                    for(let i=0;i<this.order;i++){
                        for(let j=0;j<this.order;j++){
                            // scene.remove(this.blocks[i][j][index].piece);
                            if(del)
                            scene.remove(this.blocks[i][j][index].piece);
                            // Backing up
                            if(!tempSclice[''+i+j])
                            tempSclice[''+i+j]= this.blocks[i][j][index].piece;

                            const {x,y} = this.rotationMatrixHelper(i,j,direction=='clockwise'?'':'clockwise');
                            this.blocks[i][j][index].piece = tempSclice[''+x+y] || this.blocks[x][y][index].piece;
                            
                            
                            let totalAngle = rotationAngleInterval;

                            const doRotationAnimation = ()=> {
                                if(totalAngle==90) {
                                    this.rotating= false;
                                    setTimeout(()=>resolve("done"), 500);
                                } else
                                requestAnimationFrame( doRotationAnimation );

                                const rotation = new THREE.Matrix4().makeRotationZ(degree(rotationAngleInterval*dirAngle));
                            this.blocks[i][j][index].piece.applyMatrix(rotation);
                                totalAngle+=rotationAngleInterval;
                                };
                            doRotationAnimation();
                        }
                    }
                break;
            }
        })
    }

    rotate = (notation)=>{
        // Front: Red
        // Top: White
        // Left: Green
        const mapping ={
            'U': ()=>cube.rotateSclice('y',2,'anticlockwise'),
            'Uprime': ()=>cube.rotateSclice('y',2,'clockwise'),
            'D':()=>cube.rotateSclice('y',0,'clockwise'),
            'Dprime':()=>cube.rotateSclice('y',0,'anticlockwise'),
            'R':()=>cube.rotateSclice('z',0,'clockwise'),
            'Rprime':()=>cube.rotateSclice('z',0,'anticlockwise'),
            'L':()=>cube.rotateSclice('z',2,'anticlockwise'),
            'Lprime':()=>cube.rotateSclice('z',2,'clockwise'),
            'F':()=>cube.rotateSclice('x',2,'anticlockwise'),
            'Fprime':()=>cube.rotateSclice('x',2,'clockwise'),
            'B':()=>cube.rotateSclice('x',0,'clockwise'),
            'Bprime':()=>cube.rotateSclice('x',0,'anticlockwise'),
            'M':()=>cube.rotateSclice('z',1,'anticlockwise'),
            'Mprime':()=>cube.rotateSclice('z',1,'clockwise'),
            'E':()=>cube.rotateSclice('y',1,'clockwise'),
            'Eprime':()=>cube.rotateSclice('y',1,'anticlockwise'),
            'S':()=>cube.rotateSclice('x',1,'anticlockwise'),
            'Sprime':()=>cube.rotateSclice('x',1,'clockwise'),

        }
        try{
        return mapping[notation];
        } catch(e){
            console.error('Invalid notation', e);
            console.log("step:",notation);
        }
    }

    getNormal = (obj)=>{
        const normalMatrix = new THREE.Matrix3().getNormalMatrix( obj.matrixWorld );
        return obj.geometry.faces[1].normal.clone().applyMatrix3( normalMatrix ).normalize();
    }

    getState = ()=>{
        const F = {faces: ["222","221","220","212","211","210","202","201","200"], normal: {x:1,y:0,z:0}};
        const R = {faces: ["220","120","020","210","110","010","200","100","000"], normal: {x:0,y:0,z:1}};
        const U = {faces: ["022","021","020","122","121","120","222","221","220"], normal: {x:0, y:-1,z:0}};
        const D = {faces: ["202","201","200","102","101","100","002","001","000"], normal: {x:0, y:-1,z:0}};
        const L = {faces: ["022","122","222","012","112","212","002","102","202"], normal: {x:0,y:0,z:1}};
        const B = {faces: ["020","021","022","010","011","012","000","001","002"], normal: {x:1,y:0,z:0}};


        const [fSide,rSide,uSide,dSide,lSide,bSide] = [{face:"211",normal:{x:1,y:0,z:0}},
        {face:"110",normal:{x:0,y:0,z:1}},
        {face:"121",normal:{x:0,y:-1,z:0}},
        {face:"101",normal:{x:0,y:-1,z:0}},
        {face:"112",normal:{x:0,y:0,z:1}},
        {face:"011",normal:{x:1,y:0,z:0}}]
            .map((dimension, i)=>{
                            const [x,y,z] = dimension.face.split("");
                            const children = cube.blocks[x][y][z].piece.children;
                            let color;
                            children.forEach(child=>{
                                const {x,y,z} = cube.getNormal(child);
                                if(Math.round(x) ===  dimension.normal.x && Math.round(y) ===  dimension.normal.y && Math.round(z) ===  dimension.normal.z){
                                    const {r,g,b} = child.material.color;
                                    if(r<0.1 && g<0.1 && b<0.1 ){ // Meas black borders , not actual faces to be colored.
                                        return;
                                    }
                                    color = child.material.color.getHex();
                                }
                            })
                            return color
                        })
        let state ="";
        [F,R,U,D,L,B].forEach(side=>{
            side.faces.forEach((dimension, i)=>{
                const [x,y,z] = dimension.split("");
                const children = cube.blocks[x][y][z].piece.children;
                children.forEach(child=>{
                    const {x,y,z} = this.getNormal(child);
                    if(Math.round(x) ===  side.normal.x && Math.round(y) ===  side.normal.y && Math.round(z) ===  side.normal.z){
                        const {r,g,b} = child.material.color;
                        if(r<0.1 && g<0.1 && b<0.1 ){ // Meas black borders , not actual faces to be colored.
                            return;
                        }
                        switch(child.material.color.getHex()){
                            case fSide: state+='f';break;
                            case rSide: state+='r';break;
                            case uSide: state+='u';break;
                            case dSide: state+='d';break;
                            case lSide: state+='l';break;
                            case bSide: state+='b';break;
                        }
                    }
                })
            })
            // setTimeout(()=>{
            //     scene.remove(cube.blocks[x][y][z].piece);
            // }, i*100);
        })
        return state;
    }
}

var query = location.search.replace('?','').replace(/&&/g,'&').split('&').reduce((a,e)=>{
    const data = e.split('=')	
    return {...a,[data[0]]:data[1]}
    },{})

    // 3=70, 4=100
controls.minDistance = 80+(query.order-3)*30;
controls.maxDistance = 300+((query.order-3)*30);
let cube = new Cube(query.order || 3);

function shuffle(){
    cube.shuffle(query.shuffle);
}


const activateColor = (id, index)=>{
    Array.from(document.getElementsByClassName('active')).forEach(item=>{
        item.className='';
    })
    document.getElementById(id).className='active';
    cube.activeEditColor = cube.colors[index];
}

const findSolution = async ()=>{
    try{
        const replacer = {
            f: "F S",
            r: "R Mprime",
            u: "U Eprime",
            d: "D E",
            l: "L M",
            b: "B Sprime",
            fprime: "Fprime Sprime",
            rprime: "Rprime M",
            uprime: "Uprime E",
            dprime: "Dprime Eprime",
            lprime: "Lprime Mprime",
            bprime: "Bprime S"

        }
        console.log("cube.getState()",cube.getState());
        const stepsInitial = window.rubiksCubeSolver(cube.getState());
        const steps=[];
        stepsInitial.split(' ').forEach(step=>{
            if(step.slice(-1)=== '2'){
                steps.push(step.slice(0,-1));
                steps.push(step.slice(0,-1));
            } else steps.push(step);
        })
        const stepsReplaced = steps.map(step=>{
            return replacer[step] || step;
        }).join(' ')
        if(!stepsReplaced) {
            alert("Already in solved state!");
            return;
        }
        console.log('stepsReplaced', stepsReplaced)
        cube.editMode = false;
        Array.from(document.getElementsByClassName("hideOnSolve")).forEach(e=>e.style.display="none");
        Array.from(document.getElementsByClassName("showOnSolve")).forEach(e=>e.style.display="unset");
        const finalSteps = stepsReplaced.split(' ');
        // for(let i=0; i<finalSteps.length; i++){
        //     const data = await cube.rotate(finalSteps[i])();
        //     console.log(finalSteps[i], data);
        // }
        window.solved=finalSteps;
        // cube.editMode = true;
        document.getElementById("message").innerText="Can be solved in "+finalSteps.length+" steps!"
        console.log("Solved!!!")
    } catch (e){
        alert("Unable to solve. Please make sure that you colored the cube properly!")
        console.log('e', e);
    }
}
window.isPause=true;
const pause = () => {
    window.isPause=true;
    Array.from(document.getElementsByClassName("hideOnPlay")).forEach(e=>e.style.display="unset");
    Array.from(document.getElementsByClassName("showOnPlay")).forEach(e=>e.style.display="none");
    
}

const play = async () => {
    if(!window.isPause){
        pause();
        return;
    }
    Array.from(document.getElementsByClassName("hideOnPlay")).forEach(e=>e.style.display="none");
    Array.from(document.getElementsByClassName("showOnPlay")).forEach(e=>e.style.display="unset");
        
    window.isPause=false;
    const id = setInterval(()=>{
        if(window.isPause) {
            console.log("Paused");
            clearInterval(id)
        }
        if(window.currentStep === window.solved.length -1 ){
            console.log("Finished");
            pause();
            clearInterval(id)
        }
        oneMove(1);
    }, 400);

}
const getInverse = (move) => {
    if(move.includes('prime')) return move.split('prime')[0];
    return move+'prime'
}
window.prevDir=-1;
const oneMove = async (dir) => {
    let i= (window.currentStep  || 0) + dir + (dir!==window.prevDir ?window.prevDir:0 );
    if(i<0 || i>= window.solved.length){
        console.log("Operation not allowed!!");
        return;
    }
    window.currentStep = i;

    window.prevDir=dir;
    const finalSteps = window.solved;
    const step = dir === -1 ? getInverse(finalSteps[i]) : finalSteps[i];
    console.log(i+1, step);
    document.getElementById("current-step").innerText=(i+1>0?"Step #"+(Number(i)+1)+' ( '+step.replace('prime'," '")+' )':'');

    await cube.rotate(step)();
}

const handlePrevNext = (dir) => {
    if(!window.isPause){
        console.log("Already playing...")
    } else {
        oneMove(dir);
    }
}