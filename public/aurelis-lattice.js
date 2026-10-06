/* =========================================================
   AURELIS — 3D ASSURANCE LATTICE
   Self-contained WebGL-free 3D projection.
   ========================================================= */

(() => {
    "use strict";

    const CONTACTS = {
        mail: {
            label: "Email",
            links: [
                {
                    title: "Gmail",
                    detail: "dhairytopia@gmail.com",
                    href: "mailto:dhairytopia@gmail.com",
                    icon: "gmail"
                },
                {
                    title: "Proton Mail",
                    detail: "dhairy.t@proton.me",
                    href: "mailto:dhairy.t@proton.me",
                    icon: "proton"
                }
            ]
        },
        whatsapp: {
            label: "WhatsApp",
            links: [
                {
                    title: "WhatsApp",
                    detail: "+91 9133404350",
                    href: "https://wa.me/919133404350",
                    icon: "whatsapp"
                }
            ]
        },
        github: {
            label: "GitHub",
            links: [
                {
                    title: "DT-09",
                    detail: "GitHub profile",
                    href: "https://github.com/DT-09",
                    icon: "github"
                }
            ]
        }
    };

    const NODE_DATA = [
        {
            id: "identity",
            name: "Identity",
            kicker: "Assurance Layer",
            text: "Establishes the actor, agent, service, or credential initiating an action.",
            state: "State · Active"
        },
        {
            id: "authority",
            name: "Authority",
            kicker: "Control Primitive",
            text: "Determines whether that actor is permitted to perform the proposed action.",
            state: "State · Active"
        },
        {
            id: "policy",
            name: "Policy",
            kicker: "Constraint Layer",
            text: "Applies operational and governance constraints before execution.",
            state: "State · Active"
        },
        {
            id: "control",
            name: "Control",
            kicker: "Decision Layer",
            text: "Turns assurance conditions into an executable allow, constrain, escalate, or deny decision.",
            state: "State · Active"
        },
        {
            id: "evidence",
            name: "Evidence",
            kicker: "Verification Layer",
            text: "Records the decision context and evidence needed to verify what happened.",
            state: "State · Active"
        },
        {
            id: "recovery",
            name: "Recovery",
            kicker: "Resilience Layer",
            text: "Defines containment, reassessment, and restoration when assurance conditions fail.",
            state: "State · Active"
        }
    ];

    const SVG = {
        gmail: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Z"/><path fill="#fff" d="M5.2 6.1v11.7h2.3v-8.4L12 13l4.5-3.6v8.4h2.3V6.1L12 11 5.2 6.1Z"/></svg>`,
        proton: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#6D4AFF" d="M12 2.4 21.1 7.7v8.6L12 21.6l-9.1-5.3V7.7L12 2.4Z"/><path fill="#fff" d="m7 8.1 5 2.9 5-2.9v2.4l-5 2.9-5-2.9V8.1Z"/></svg>`,
        whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Z"/><path fill="#fff" d="M16.2 13.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.7 1-.1.2-.3.2-.5.1-1.8-.9-3-1.6-4-3.6-.2-.3 0-.4.1-.6l.4-.5c.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2 0 1.3 1 2.5 1.1 2.7.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3Z"/></svg>`,
        github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.8 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.7-2.3 4.5-4.5 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"/></svg>`
    };

    function makeContactUI() {
        const footer = document.querySelector("footer") || document.body;

        let existing = footer.querySelector(".aurelis-contact-strip");
        if (existing) existing.remove();

        const strip = document.createElement("div");
        strip.className = "aurelis-contact-strip";
        strip.setAttribute("aria-label", "Contact Aurelis");

        const note = document.createElement("span");
        note.className = "aurelis-contact-note";
        note.textContent = "Contact";
        strip.appendChild(note);

        Object.entries(CONTACTS).forEach(([key, group]) => {
            const item = document.createElement("div");
            item.className = "aurelis-contact-item";

            const button = document.createElement("button");
            button.type = "button";
            button.className = "aurelis-contact-button";
            button.setAttribute("aria-label", group.label);
            button.innerHTML = SVG[group.links[0].icon];

            const pop = document.createElement("div");
            pop.className = "aurelis-contact-popover";

            const label = document.createElement("div");
            label.className = "aurelis-contact-popover-label";
            label.textContent = group.label;
            pop.appendChild(label);

            group.links.forEach(link => {
                const a = document.createElement("a");
                a.className = "aurelis-contact-link";
                a.href = link.href;
                a.target = link.href.startsWith("http") ? "_blank" : "_self";
                a.rel = link.href.startsWith("http") ? "noopener noreferrer" : "";
                a.innerHTML = `${SVG[link.icon]}<span>${link.title}<small>${link.detail}</small></span>`;
                pop.appendChild(a);
            });

            button.addEventListener("click", e => {
                e.stopPropagation();
                document.querySelectorAll(".aurelis-contact-popover.open").forEach(x => {
                    if (x !== pop) x.classList.remove("open");
                });
                pop.classList.toggle("open");
            });

            item.appendChild(button);
            item.appendChild(pop);
            strip.appendChild(item);
        });

        footer.appendChild(strip);

        document.addEventListener("click", () => {
            document.querySelectorAll(".aurelis-contact-popover.open")
                .forEach(x => x.classList.remove("open"));
        });
    }

    function locateFabric() {
        const candidates = [
            ".control-fabric",
            "#control-fabric",
            "[data-section='control-fabric']",
            ".fabric",
            ".topology"
        ];

        for (const selector of candidates) {
            const el = document.querySelector(selector);
            if (el) return el;
        }

        const headings = [...document.querySelectorAll("h1,h2,h3,h4,p")];
        const heading = headings.find(x => /control\s*fabric/i.test(x.textContent || ""));
        return heading ? (heading.closest("section") || heading.parentElement) : null;
    }

    function buildLattice() {
        const fabric = locateFabric();
        if (!fabric) return;

        document.querySelectorAll(".aurelis-3d-stage").forEach(x => x.remove());

        // Remove the previous visualization without disturbing the section's copy.
        fabric.querySelectorAll("canvas:not(.aurelis-3d-canvas), .fabric-dot, .blue-dot, .signal-dot, .moving-dot")
            .forEach(x => x.remove());

        const stage = document.createElement("div");
        stage.className = "aurelis-3d-stage";

        const canvas = document.createElement("canvas");
        canvas.className = "aurelis-3d-canvas";
        stage.appendChild(canvas);

        const hud = document.createElement("div");
        hud.className = "aurelis-3d-hud";
        hud.innerHTML = "<strong>ASSURANCE LATTICE</strong>Drag to rotate · Select a node";
        stage.appendChild(hud);

        const help = document.createElement("div");
        help.className = "aurelis-3d-help";
        help.textContent = "Identity · Authority · Policy · Control · Evidence · Recovery";
        stage.appendChild(help);

        const card = document.createElement("div");
        card.className = "aurelis-node-card";
        stage.appendChild(card);

        fabric.appendChild(stage);

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const nodes = [
            { ...NODE_DATA[0], p: [-1.05, .55, .78] },
            { ...NODE_DATA[1], p: [1.02, .55, .72] },
            { ...NODE_DATA[2], p: [-1.12, -.55, .58] },
            { ...NODE_DATA[3], p: [1.10, -.48, .65] },
            { ...NODE_DATA[4], p: [0, 1.05, -.58] },
            { ...NODE_DATA[5], p: [0, -1.05, -.48] }
        ];

        // Irregular octahedral-style lattice: not a literal sphere.
        const edges = [
            [0,1],[0,2],[0,4],[0,5],
            [1,2],[1,3],[1,4],[1,5],
            [2,3],[2,4],[2,5],
            [3,4],[3,5],
            [4,5]
        ];

        let width = 1, height = 1, dpr = 1;
        let rx = -.12, ry = .25;
        let targetRx = rx, targetRy = ry;
        let zoom = 1;
        let selected = null;
        let hover = null;
        let dragging = false;
        let lastX = 0, lastY = 0;
        let velX = 0, velY = 0;
        let lastTime = performance.now();

        function resize() {
            const r = stage.getBoundingClientRect();
            width = Math.max(1, r.width);
            height = Math.max(1, r.height);
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(dpr,0,0,dpr,0,0);
        }

        function rotate(p) {
            let [x,y,z] = p;

            const cy = Math.cos(ry), sy = Math.sin(ry);
            const x1 = x * cy - z * sy;
            const z1 = x * sy + z * cy;

            const cx = Math.cos(rx), sx = Math.sin(rx);
            const y1 = y * cx - z1 * sx;
            const z2 = y * sx + z1 * cx;

            return [x1,y1,z2];
        }

        function project(p) {
            const [x,y,z] = rotate(p);
            const perspective = 3.8;
            const scale = Math.min(width,height) * .235 * zoom;
            const f = perspective / (perspective - z);
            return {
                x: width/2 + x * scale * f,
                y: height/2 - y * scale * f,
                z,
                depth: f
            };
        }

        function edgeColor(alpha) {
            return `rgba(123,151,178,${alpha})`;
        }

        function draw(t) {
            ctx.clearRect(0,0,width,height);

            // Core atmospheric glow.
            const glow = ctx.createRadialGradient(width/2,height/2,2,width/2,height/2,170);
            glow.addColorStop(0,"rgba(73,121,164,.13)");
            glow.addColorStop(.45,"rgba(73,121,164,.045)");
            glow.addColorStop(1,"rgba(0,0,0,0)");
            ctx.fillStyle = glow;
            ctx.fillRect(0,0,width,height);

            const pts = nodes.map(n => project(n.p));

            // Back-to-front edges.
            edges
                .map(([a,b]) => ({a,b,z:(pts[a].z+pts[b].z)/2}))
                .sort((a,b) => a.z-b.z)
                .forEach(e => {
                    const a = pts[e.a], b = pts[e.b];
                    const emphasis = selected === e.a || selected === e.b || hover === e.a || hover === e.b;
                    ctx.beginPath();
                    ctx.moveTo(a.x,a.y);
                    ctx.lineTo(b.x,b.y);
                    ctx.lineWidth = emphasis ? 1.35 : .75;
                    ctx.strokeStyle = edgeColor(emphasis ? .46 : .18);
                    ctx.stroke();
                });

            // Central assurance core.
            const corePulse = 1 + Math.sin(t*.0014)*.07;
            const cr = 11 * corePulse;
            const core = ctx.createRadialGradient(width/2,height/2,1,width/2,height/2,cr*2.8);
            core.addColorStop(0,"rgba(211,180,102,.34)");
            core.addColorStop(.35,"rgba(80,132,174,.15)");
            core.addColorStop(1,"rgba(0,0,0,0)");
            ctx.fillStyle = core;
            ctx.beginPath();
            ctx.arc(width/2,height/2,cr*2.8,0,Math.PI*2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(width/2,height/2,3.5,0,Math.PI*2);
            ctx.fillStyle = "rgba(231,212,163,.75)";
            ctx.fill();

            // Nodes.
            pts
                .map((p,i) => ({p,i}))
                .sort((a,b)=>a.p.z-b.p.z)
                .forEach(({p,i}) => {
                    const active = selected === i;
                    const hot = hover === i;
                    const radius = (active ? 8 : hot ? 7 : 5.5) * Math.max(.72, p.depth);

                    if (active || hot) {
                        ctx.beginPath();
                        ctx.arc(p.x,p.y,radius*2.6,0,Math.PI*2);
                        ctx.strokeStyle = active
                            ? "rgba(211,180,102,.27)"
                            : "rgba(104,161,208,.22)";
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }

                    const nodeGlow = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,radius*3);
                    nodeGlow.addColorStop(0, active ? "rgba(229,202,133,.55)" : "rgba(102,159,207,.25)");
                    nodeGlow.addColorStop(1, "rgba(0,0,0,0)");
                    ctx.fillStyle = nodeGlow;
                    ctx.beginPath();
                    ctx.arc(p.x,p.y,radius*3,0,Math.PI*2);
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(p.x,p.y,radius,0,Math.PI*2);
                    ctx.fillStyle = active ? "#e2c681" : "#d8dde2";
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(p.x,p.y,radius*.48,0,Math.PI*2);
                    ctx.fillStyle = active ? "#fff1c8" : "#89a8c1";
                    ctx.fill();

                    // Label.
                    const labelOffset = 14 * Math.max(.8,p.depth);
                    ctx.font = `${active || hot ? 600 : 500} 11px ui-sans-serif,system-ui,sans-serif`;
                    ctx.textAlign = "center";
                    ctx.fillStyle = active ? "rgba(246,231,190,.94)" : "rgba(226,231,236,.66)";
                    ctx.fillText(nodes[i].name, p.x, p.y - labelOffset);
                });

            requestAnimationFrame(draw);
        }

        function updateCard(index) {
            if (index == null) {
                card.classList.remove("visible");
                return;
            }

            const n = nodes[index];
            card.innerHTML = `
                <div class="node-kicker">${n.kicker}</div>
                <h3>${n.name}</h3>
                <p>${n.text}</p>
                <div class="node-state">${n.state}</div>
            `;

            const p = project(n.p);
            let left = p.x + 24;
            let top = p.y - 45;

            if (left + 315 > width - 14) left = p.x - 339;
            if (left < 14) left = 14;
            if (top < 14) top = 14;
            if (top + 180 > height - 14) top = height - 194;

            card.style.left = left + "px";
            card.style.top = top + "px";
            card.classList.add("visible");
        }

        function pick(x,y) {
            const pts = nodes.map(n=>project(n.p));
            let best = -1, dist = Infinity;

            pts.forEach((p,i)=>{
                const d = Math.hypot(x-p.x,y-p.y);
                const threshold = Math.max(17, 27 * p.depth);
                if (d < threshold && d < dist) {
                    best = i;
                    dist = d;
                }
            });

            return best;
        }

        function selectNode(index) {
            if (index < 0) return;

            selected = index;
            const p = rotate(nodes[index].p);

            // Bring selected node naturally toward the viewer.
            targetRy += Math.atan2(p[0], p[2]) * .42;
            targetRx += Math.atan2(p[1], Math.sqrt(p[0]*p[0]+p[2]*p[2])) * .32;

            updateCard(index);
        }

        canvas.addEventListener("pointerdown", e => {
            dragging = true;
            canvas.classList.add("dragging");
            canvas.setPointerCapture(e.pointerId);
            lastX = e.clientX;
            lastY = e.clientY;
            velX = velY = 0;
        });

        canvas.addEventListener("pointermove", e => {
            const r = canvas.getBoundingClientRect();
            const x = e.clientX-r.left;
            const y = e.clientY-r.top;

            if (dragging) {
                const dx = e.clientX-lastX;
                const dy = e.clientY-lastY;
                targetRy += dx*.006;
                targetRx += dy*.005;
                velY = dx*.006;
                velX = dy*.005;
                lastX=e.clientX;
                lastY=e.clientY;
            } else {
                hover = pick(x,y);
                canvas.style.cursor = hover >= 0 ? "pointer" : "grab";
            }
        });

        canvas.addEventListener("pointerup", e => {
            dragging = false;
            canvas.classList.remove("dragging");

            const r = canvas.getBoundingClientRect();
            const index = pick(e.clientX-r.left,e.clientY-r.top);

            if (index >= 0) selectNode(index);
        });

        canvas.addEventListener("pointercancel", () => {
            dragging = false;
            canvas.classList.remove("dragging");
        });

        canvas.addEventListener("wheel", e => {
            e.preventDefault();
            zoom = Math.max(.72, Math.min(1.28, zoom - e.deltaY*.00055));
        }, {passive:false});

        function tick(now) {
            const dt = Math.min(32, now-lastTime);
            lastTime = now;

            if (!dragging) {
                // Slow autonomous rotation.
                targetRy += dt*.000075;
                targetRx += Math.sin(now*.00015)*.000012;

                // Inertia after manual rotation.
                targetRy += velY;
                targetRx += velX;
                velX *= .93;
                velY *= .93;
            }

            rx += (targetRx-rx)*.08;
            ry += (targetRy-ry)*.08;

            if (selected != null && !dragging) {
                updateCard(selected);
            }
        }

        function loop(now) {
            tick(now);
            requestAnimationFrame(loop);
        }

        resize();
        window.addEventListener("resize", resize, {passive:true});
        requestAnimationFrame(draw);
        requestAnimationFrame(loop);
    }

    function boot() {
        makeContactUI();
        buildLattice();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, {once:true});
    } else {
        boot();
    }
})();
