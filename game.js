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
        this.order=order;
        this.pieceSize=10;
        this.blocks=[];
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
    colors =[0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff8c00, 0xffffff]

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

    checkGameStatus = ()=>{
        if(this.alreadyWon) return false;
        for(let i=0;i<this.order;i++){
            for(let j=0;j<this.order;j++){
                for(let k=0;k<this.order;k++){
                    if(this.blocks[i][j][k].piece.name && this.blocks[i][j][k].piece.name !==''+i+j+k){
                        return false;
                    }
                }
            }
        }
        this.alreadyWon=true;
        return true;
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
        if(this.rotating) {
            console.log("Already in one rotation...!");
            return;
        }
        if(index>=this.order) 
            throw new Error('Rotation not possible on this index : '+index+' because maximum size is : '+(this.order-1));
        if('xyz'.indexOf(axis)==-1)
        throw new Error('Rotation on invalid axis: '+axis);
        let dirAngle;
        let rotationAngleInterval =15;
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
                        // let timer = setInterval(()=>{
                        //     if(totalAngle==90) {
                        //         this.rotating= false;
                        //         clearInterval(timer);
                        //     }
                        //     const rotation = new THREE.Matrix4().makeRotationX(degree(rotationAngleInterval * dirAngle));
                        //     this.blocks[index][i][j].piece.applyMatrix(rotation);
                        //     totalAngle+=rotationAngleInterval;
                        // },10)

                        const doRotationAnimation = ()=> {
                            if(totalAngle==90) {
                                this.rotating= false;
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
                        // let timer = setInterval(()=>{
                        //     if(totalAngle==90) {
                        //         this.rotating= false;
                        //         clearInterval(timer);
                        //     }
                        //     const rotation = new THREE.Matrix4().makeRotationY(degree(rotationAngleInterval * dirAngle));
                        // this.blocks[i][index][j].piece.applyMatrix(rotation);
                        //     totalAngle+=rotationAngleInterval;
                        // },10)

                        const doRotationAnimation = ()=> {
                            if(totalAngle==90) {
                                this.rotating= false;
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
                        // let timer = setInterval(()=>{
                        //     if(totalAngle==90) {
                        //         this.rotating= false;
                        //         clearInterval(timer);
                        //     }
                        //     const rotation = new THREE.Matrix4().makeRotationZ(degree(rotationAngleInterval*dirAngle));
                        // this.blocks[i][j][index].piece.applyMatrix(rotation);
                        //     totalAngle+=rotationAngleInterval;
                        // },10)

                        const doRotationAnimation = ()=> {
                            if(totalAngle==90) {
                                this.rotating= false;
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
    }
}

var query = location.search.replace('?','').replace(/&&/g,'&').split('&').reduce((a,e)=>{
    data = e.split('=')	
    return {...a,[data[0]]:data[1]}
    },{})

    // 3=70, 4=100
controls.minDistance = 80+(query.order-3)*30;
controls.maxDistance = 300+((query.order-3)*30);
let cube = new Cube(query.order || 3);

function shuffle(){
    cube.shuffle(query.shuffle);
}



