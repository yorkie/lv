
build:
	./gyp_quip.py -f make && make -C out

debug: build
	./out/Debug/quip examples/simple.q

lldb: build
	lldb ./out/Debug/quip