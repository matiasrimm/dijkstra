function NameDistQueue () {
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

function WeightedNegativeDijkstra() {
	this.queue = new NameDistQueue();

	this.enqueue = function (name, dists) {
		this.queue.enqueue(name, dists);
	}

	this.getWeigthed = function (start,end) {
		var cvw,
		ansOrder = [],
		ansWrap = {},
		currentVertex = {},
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
			currentVertex = this.queue.dequeue();

			if( distFromStart[currentVertex.name] === Infinity) {
				this.queue.enqueue(currentVertex.name, currentVertex.dists);
			}

			for (vertix in thisQueue) {
				cvwPlusDist = distFromStart[currentVertex.name]
					+ thisQueue[vertix].dists[currentVertex.name];

				if (cvwPlusDist < distFromStart[thisQueue[vertix].name]) {
					distFromStart[thisQueue[vertix].name] = cvwPlusDist;
					prev[thisQueue[vertix].name] = currentVertex.name;
					this.queue.enqueue(thisQueue[vertix].name, thisQueue[vertix].dists);
				}
			}
		}

		var x = end;
		ansOrder.push(end);
		while(prev[x]) {
			ansOrder.push(prev[x]);
			x = prev[x];
		}

		ansWrap.dist = distFromStart[end];
		ansWrap.order = ansOrder;

		//console.log(ansWrap.dist + " ja " + ansWrap.order)

		return ansWrap;
	}
}
