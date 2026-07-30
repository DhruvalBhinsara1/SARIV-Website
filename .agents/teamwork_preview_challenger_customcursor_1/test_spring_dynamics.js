// Numerical and Analytical Spring Dynamics Simulator
// New Spring: m=0.1, k=900, c=18
// Old Spring: m=0.5, k=400, c=30

function simulateSpring(m, k, c, targetX = 100, dt = 0.0001, totalDuration = 1.0) {
  let x = 0;
  let v = 0;
  let t = 0;

  const trajectory = [];
  let t10 = null;
  let t50 = null;
  let t90 = null;
  let t95 = null;
  let t99 = null;
  let tRest = null;
  let maxOverShoot = 0;

  const restDelta = 0.001 * targetX; // 0.1% threshold
  const restSpeed = 0.001;

  while (t <= totalDuration) {
    trajectory.push({ t, x, v });

    const error = targetX - x;
    const absError = Math.abs(error);
    const overshoot = x - targetX;
    if (overshoot > maxOverShoot) maxOverShoot = overshoot;

    if (t10 === null && x >= 0.10 * targetX) t10 = t;
    if (t50 === null && x >= 0.50 * targetX) t50 = t;
    if (t90 === null && x >= 0.90 * targetX) t90 = t;
    if (t95 === null && x >= 0.95 * targetX) t95 = t;
    if (t99 === null && x >= 0.99 * targetX) t99 = t;

    // Check rest condition: position within restDelta and velocity within restSpeed
    if (tRest === null && absError <= restDelta && Math.abs(v) <= restSpeed) {
      tRest = t;
    }

    // RK4 Integration step
    const f = (x_curr, v_curr) => {
      const a = (k * (targetX - x_curr) - c * v_curr) / m;
      return { dx: v_curr, dv: a };
    };

    const k1 = f(x, v);
    const k2 = f(x + 0.5 * dt * k1.dx, v + 0.5 * dt * k1.dv);
    const k3 = f(x + 0.5 * dt * k2.dx, v + 0.5 * dt * k2.dv);
    const k4 = f(x + dt * k3.dx, v + dt * k3.dv);

    x += (dt / 6) * (k1.dx + 2 * k2.dx + 2 * k3.dx + k4.dx);
    v += (dt / 6) * (k1.dv + 2 * k2.dv + 2 * k3.dv + k4.dv);
    t += dt;
  }

  return {
    t10_ms: t10 !== null ? t10 * 1000 : null,
    t50_ms: t50 !== null ? t50 * 1000 : null,
    t90_ms: t90 !== null ? t90 * 1000 : null,
    t95_ms: t95 !== null ? t95 * 1000 : null,
    t99_ms: t99 !== null ? t99 * 1000 : null,
    tRest_ms: tRest !== null ? tRest * 1000 : null,
    overshoot_percent: (maxOverShoot / targetX) * 100,
    trajectory
  };
}

function runAnalysis() {
  console.log('=== STRESS TEST 2: Spring Dynamics & Settling Time Analysis ===\n');

  // Analytical derivations
  const newSpring = { m: 0.1, k: 900, c: 18, name: 'New Spring (m=0.1, k=900, c=18)' };
  const oldSpring = { m: 0.5, k: 400, c: 30, name: 'Old Spring (m=0.5, k=400, c=30)' };

  [newSpring, oldSpring].forEach(s => {
    s.wn = Math.sqrt(s.k / s.m); // natural frequency rad/s
    s.zeta = s.c / (2 * Math.sqrt(s.m * s.k)); // damping ratio
    if (s.zeta < 1) {
      s.type = 'Underdamped';
      s.wd = s.wn * Math.sqrt(1 - s.zeta * s.zeta);
      s.sigma = s.zeta * s.wn; // decay envelope exponent
      s.roots = `${(-s.sigma).toFixed(1)} ± ${s.wd.toFixed(1)}i`;
    } else if (s.zeta === 1) {
      s.type = 'Critically Damped';
      s.sigma = s.wn;
      s.roots = `${(-s.sigma).toFixed(1)} (double root)`;
    } else {
      s.type = 'Overdamped';
      const term = Math.sqrt(s.zeta * s.zeta - 1);
      s.r1 = -s.wn * (s.zeta - term);
      s.r2 = -s.wn * (s.zeta + term);
      s.sigma = Math.abs(s.r1); // dominant pole
      s.roots = `${s.r1.toFixed(1)}, ${s.r2.toFixed(1)}`;
    }
  });

  console.log('--- Analytical System Parameters ---');
  console.table([
    {
      Spring: newSpring.name,
      Type: newSpring.type,
      'ω_n (rad/s)': newSpring.wn.toFixed(2),
      'Damping ζ': newSpring.zeta.toFixed(4),
      'Eigenvalues / Roots': newSpring.roots,
      'Decay Rate σ (s⁻¹)': newSpring.sigma.toFixed(1)
    },
    {
      Spring: oldSpring.name,
      Type: oldSpring.type,
      'ω_n (rad/s)': oldSpring.wn.toFixed(2),
      'Damping ζ': oldSpring.zeta.toFixed(4),
      'Eigenvalues / Roots': oldSpring.roots,
      'Decay Rate σ (s⁻¹)': oldSpring.sigma.toFixed(1)
    }
  ]);

  // Numerical Simulations
  const simNew = simulateSpring(0.1, 900, 18);
  const simOld = simulateSpring(0.5, 400, 30);

  console.log('\n--- Empirical RK4 Step Response Simulation Results (100px step) ---');
  console.table([
    {
      Metric: '50% Rise Time (ms)',
      'New Spring': simNew.t50_ms.toFixed(1),
      'Old Spring': simOld.t50_ms.toFixed(1),
      'Speedup Ratio': (simOld.t50_ms / simNew.t50_ms).toFixed(2) + 'x faster'
    },
    {
      Metric: '90% Response Time (ms)',
      'New Spring': simNew.t90_ms.toFixed(1),
      'Old Spring': simOld.t90_ms.toFixed(1),
      'Speedup Ratio': (simOld.t90_ms / simNew.t90_ms).toFixed(2) + 'x faster'
    },
    {
      Metric: '95% Settling Time (ms)',
      'New Spring': simNew.t95_ms.toFixed(1),
      'Old Spring': simOld.t95_ms.toFixed(1),
      'Speedup Ratio': (simOld.t95_ms / simNew.t95_ms).toFixed(2) + 'x faster'
    },
    {
      Metric: '99% Settling Time (ms)',
      'New Spring': simNew.t99_ms.toFixed(1),
      'Old Spring': simOld.t99_ms.toFixed(1),
      'Speedup Ratio': (simOld.t99_ms / simNew.t99_ms).toFixed(2) + 'x faster'
    },
    {
      Metric: 'Rest Threshold Time (restDelta=0.001) (ms)',
      'New Spring': simNew.tRest_ms.toFixed(1),
      'Old Spring': simOld.tRest_ms.toFixed(1),
      'Speedup Ratio': (simOld.tRest_ms / simNew.tRest_ms).toFixed(2) + 'x faster'
    },
    {
      Metric: 'Max Overshoot (%)',
      'New Spring': simNew.overshoot_percent.toFixed(2) + '%',
      'Old Spring': simOld.overshoot_percent.toFixed(2) + '%',
      'Speedup Ratio': 'N/A'
    }
  ]);

  console.log('--- Step Trajectory Samples ---');
  console.log('Time(ms) | New Spring Pos (px) | Old Spring Pos (px)');
  for (let ms of [0, 10, 20, 35, 46, 77, 100, 150, 184, 250, 345]) {
    const pNew = simNew.trajectory.find(p => p.t >= ms / 1000)?.x || 100;
    const pOld = simOld.trajectory.find(p => p.t >= ms / 1000)?.x || 100;
    console.log(`${ms.toString().padStart(8)} | ${pNew.toFixed(2).padStart(19)} | ${pOld.toFixed(2).padStart(19)}`);
  }
}

runAnalysis();
