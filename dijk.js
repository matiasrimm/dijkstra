function Queue () {
	this.q = [];
	this.getQueue = function () {
		return this.q;
	}
	this.enqueue = function (name, dists) {
		this.q.push({
			name: name,
			dists: dists
		});
	}
	this.dequeue = function () {
		return this.q.shift();
	}
	this.isEmpty = function () {
		return !this.q.length;
	}
}

function WeightedNegative() {
	this.queue = new Queue();
	
	this.addV = function (name, dists) {
		this.queue.enqueue(name, dists);
	}
	
	this.getWeigthed = function (start,end) {
		var cvw,
		prev = {},
		distFromStart = {},
		thisQueue = this.queue.getQueue();
		
		for (vertix in thisQueue) {
			if (thisQueue[vertix].name === start)
				distFromStart[thisQueue[vertix].name] = 0;
		    else
		    	distFromStart[thisQueue[vertix].name] = Infinity;
		}
		
		while(!this.queue.isEmpty()){
			currentVertex = this.queue.dequeue().name;
			for (vertix in thisQueue) {
				cvwPlusDist = distFromStart[currentVertex]
					+ thisQueue[vertix].dists[currentVertex];
				
				if (cvwPlusDist < distFromStart[thisQueue[vertix].name]) {
					distFromStart[thisQueue[vertix].name] = cvwPlusDist;
					prev[thisQueue[vertix].name] = currentVertex;
					this.queue.enqueue(thisQueue[vertix].name, thisQueue[vertix].dists);
				}
			}
		}
		for (x in prev) {
			console.log(x + " edellinen " + prev[x]);
		}
		
		for (x in distFromStart) {
			console.log(x + " etäisyys lähdöstä " + distFromStart[x]);
		}
	}
}

var nen = new WeightedNegative();

nen.addV('TAMPERE', {HESA: 2, TURKU: 8, STADI: 8});
nen.addV('STADI', {TAMPERE: 8, HESA: 8});
nen.addV('HESA', {TAMPERE: 2, TURKU: 2, STADI: 8});
nen.addV('TURKU', {TAMPERE: 8, HESA: 2});

nen.getWeigthed('TAMPERE', 'HESA');