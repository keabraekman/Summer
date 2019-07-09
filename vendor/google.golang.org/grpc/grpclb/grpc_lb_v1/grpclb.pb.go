// Code generated by protoc-gen-go.
// source: grpclb.proto
// DO NOT EDIT!

/*
Package grpc_lb_v1 is a generated protocol buffer package.

It is generated from these files:
	grpclb.proto

It has these top-level messages:
	Duration
	Timestamp
	LoadBalanceRequest
	InitialLoadBalanceRequest
	ClientStats
	LoadBalanceResponse
	InitialLoadBalanceResponse
	ServerList
	Server
*/
package grpc_lb_v1

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type Duration struct {
	// Signed seconds of the span of time. Must be from -315,576,000,000
	// to +315,576,000,000 inclusive.
	Seconds int64 `protobuf:"varint,1,opt,name=seconds" json:"seconds,omitempty"`
	// Signed fractions of a second at nanosecond resolution of the span
	// of time. Durations less than one second are represented with a 0
	// `seconds` field and a positive or negative `nanos` field. For durations
	// of one second or more, a non-zero value for the `nanos` field must be
	// of the same sign as the `seconds` field. Must be from -999,999,999
	// to +999,999,999 inclusive.
	Nanos int32 `protobuf:"varint,2,opt,name=nanos" json:"nanos,omitempty"`
}

func (m *Duration) Reset()                    { *m = Duration{} }
func (m *Duration) String() string            { return proto.CompactTextString(m) }
func (*Duration) ProtoMessage()               {}
func (*Duration) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *Duration) GetSeconds() int64 {
	if m != nil {
		return m.Seconds
	}
	return 0
}

func (m *Duration) GetNanos() int32 {
	if m != nil {
		return m.Nanos
	}
	return 0
}

type Timestamp struct {
	// Represents seconds of UTC time since Unix epoch
	// 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
	// 9999-12-31T23:59:59Z inclusive.
	Seconds int64 `protobuf:"varint,1,opt,name=seconds" json:"seconds,omitempty"`
	// Non-negative fractions of a second at nanosecond resolution. Negative
	// second values with fractions must still have non-negative nanos values
	// that count forward in time. Must be from 0 to 999,999,999
	// inclusive.
	Nanos int32 `protobuf:"varint,2,opt,name=nanos" json:"nanos,omitempty"`
}

func (m *Timestamp) Reset()                    { *m = Timestamp{} }
func (m *Timestamp) String() string            { return proto.CompactTextString(m) }
func (*Timestamp) ProtoMessage()               {}
func (*Timestamp) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

func (m *Timestamp) GetSeconds() int64 {
	if m != nil {
		return m.Seconds
	}
	return 0
}

func (m *Timestamp) GetNanos() int32 {
	if m != nil {
		return m.Nanos
	}
	return 0
}

type LoadBalanceRequest struct {
	// Types that are valid to be assigned to LoadBalanceRequestType:
	//	*LoadBalanceRequest_InitialRequest
	//	*LoadBalanceRequest_ClientStats
	LoadBalanceRequestType isLoadBalanceRequest_LoadBalanceRequestType `protobuf_oneof:"load_balance_request_type"`
}

func (m *LoadBalanceRequest) Reset()                    { *m = LoadBalanceRequest{} }
func (m *LoadBalanceRequest) String() string            { return proto.CompactTextString(m) }
func (*LoadBalanceRequest) ProtoMessage()               {}
func (*LoadBalanceRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{2} }

type isLoadBalanceRequest_LoadBalanceRequestType interface {
	isLoadBalanceRequest_LoadBalanceRequestType()
}

type LoadBalanceRequest_InitialRequest struct {
	InitialRequest *InitialLoadBalanceRequest `protobuf:"bytes,1,opt,name=initial_request,json=initialRequest,oneof"`
}
type LoadBalanceRequest_ClientStats struct {
	ClientStats *ClientStats `protobuf:"bytes,2,opt,name=client_stats,json=clientStats,oneof"`
}

func (*LoadBalanceRequest_InitialRequest) isLoadBalanceRequest_LoadBalanceRequestType() {}
func (*LoadBalanceRequest_ClientStats) isLoadBalanceRequest_LoadBalanceRequestType()    {}

func (m *LoadBalanceRequest) GetLoadBalanceRequestType() isLoadBalanceRequest_LoadBalanceRequestType {
	if m != nil {
		return m.LoadBalanceRequestType
	}
	return nil
}

func (m *LoadBalanceRequest) GetInitialRequest() *InitialLoadBalanceRequest {
	if x, ok := m.GetLoadBalanceRequestType().(*LoadBalanceRequest_InitialRequest); ok {
		return x.InitialRequest
	}
	return nil
}

func (m *LoadBalanceRequest) GetClientStats() *ClientStats {
	if x, ok := m.GetLoadBalanceRequestType().(*LoadBalanceRequest_ClientStats); ok {
		return x.ClientStats
	}
	return nil
}

// XXX_OneofFuncs is for the internal use of the proto package.
func (*LoadBalanceRequest) XXX_OneofFuncs() (func(msg proto.Message, b *proto.Buffer) error, func(msg proto.Message, tag, wire int, b *proto.Buffer) (bool, error), func(msg proto.Message) (n int), []interface{}) {
	return _LoadBalanceRequest_OneofMarshaler, _LoadBalanceRequest_OneofUnmarshaler, _LoadBalanceRequest_OneofSizer, []interface{}{
		(*LoadBalanceRequest_InitialRequest)(nil),
		(*LoadBalanceRequest_ClientStats)(nil),
	}
}

func _LoadBalanceRequest_OneofMarshaler(msg proto.Message, b *proto.Buffer) error {
	m := msg.(*LoadBalanceRequest)
	// load_balance_request_type
	switch x := m.LoadBalanceRequestType.(type) {
	case *LoadBalanceRequest_InitialRequest:
		b.EncodeVarint(1<<3 | proto.WireBytes)
		if err := b.EncodeMessage(x.InitialRequest); err != nil {
			return err
		}
	case *LoadBalanceRequest_ClientStats:
		b.EncodeVarint(2<<3 | proto.WireBytes)
		if err := b.EncodeMessage(x.ClientStats); err != nil {
			return err
		}
	case nil:
	default:
		return fmt.Errorf("LoadBalanceRequest.LoadBalanceRequestType has unexpected type %T", x)
	}
	return nil
}

func _LoadBalanceRequest_OneofUnmarshaler(msg proto.Message, tag, wire int, b *proto.Buffer) (bool, error) {
	m := msg.(*LoadBalanceRequest)
	switch tag {
	case 1: // load_balance_request_type.initial_request
		if wire != proto.WireBytes {
			return true, proto.ErrInternalBadWireType
		}
		msg := new(InitialLoadBalanceRequest)
		err := b.DecodeMessage(msg)
		m.LoadBalanceRequestType = &LoadBalanceRequest_InitialRequest{msg}
		return true, err
	case 2: // load_balance_request_type.client_stats
		if wire != proto.WireBytes {
			return true, proto.ErrInternalBadWireType
		}
		msg := new(ClientStats)
		err := b.DecodeMessage(msg)
		m.LoadBalanceRequestType = &LoadBalanceRequest_ClientStats{msg}
		return true, err
	default:
		return false, nil
	}
}

func _LoadBalanceRequest_OneofSizer(msg proto.Message) (n int) {
	m := msg.(*LoadBalanceRequest)
	// load_balance_request_type
	switch x := m.LoadBalanceRequestType.(type) {
	case *LoadBalanceRequest_InitialRequest:
		s := proto.Size(x.InitialRequest)
		n += proto.SizeVarint(1<<3 | proto.WireBytes)
		n += proto.SizeVarint(uint64(s))
		n += s
	case *LoadBalanceRequest_ClientStats:
		s := proto.Size(x.ClientStats)
		n += proto.SizeVarint(2<<3 | proto.WireBytes)
		n += proto.SizeVarint(uint64(s))
		n += s
	case nil:
	default:
		panic(fmt.Sprintf("proto: unexpected type %T in oneof", x))
	}
	return n
}

type InitialLoadBalanceRequest struct {
	// Name of load balanced service (IE, balancer.service.com)
	// length should be less than 256 bytes.
	Name string `protobuf:"bytes,1,opt,name=name" json:"name,omitempty"`
}

func (m *InitialLoadBalanceRequest) Reset()                    { *m = InitialLoadBalanceRequest{} }
func (m *InitialLoadBalanceRequest) String() string            { return proto.CompactTextString(m) }
func (*InitialLoadBalanceRequest) ProtoMessage()               {}
func (*InitialLoadBalanceRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{3} }

func (m *InitialLoadBalanceRequest) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

// Contains client level statistics that are useful to load balancing. Each
// count except the timestamp should be reset to zero after reporting the stats.
type ClientStats struct {
	// The timestamp of generating the report.
	Timestamp *Timestamp `protobuf:"bytes,1,opt,name=timestamp" json:"timestamp,omitempty"`
	// The total number of RPCs that started.
	NumCallsStarted int64 `protobuf:"varint,2,opt,name=num_calls_started,json=numCallsStarted" json:"num_calls_started,omitempty"`
	// The total number of RPCs that finished.
	NumCallsFinished int64 `protobuf:"varint,3,opt,name=num_calls_finished,json=numCallsFinished" json:"num_calls_finished,omitempty"`
	// The total number of RPCs that were dropped by the client because of rate
	// limiting.
	NumCallsFinishedWithDropForRateLimiting int64 `protobuf:"varint,4,opt,name=num_calls_finished_with_drop_for_rate_limiting,json=numCallsFinishedWithDropForRateLimiting" json:"num_calls_finished_with_drop_for_rate_limiting,omitempty"`
	// The total number of RPCs that were dropped by the client because of load
	// balancing.
	NumCallsFinishedWithDropForLoadBalancing int64 `protobuf:"varint,5,opt,name=num_calls_finished_with_drop_for_load_balancing,json=numCallsFinishedWithDropForLoadBalancing" json:"num_calls_finished_with_drop_for_load_balancing,omitempty"`
	// The total number of RPCs that failed to reach a server except dropped RPCs.
	NumCallsFinishedWithClientFailedToSend int64 `protobuf:"varint,6,opt,name=num_calls_finished_with_client_failed_to_send,json=numCallsFinishedWithClientFailedToSend" json:"num_calls_finished_with_client_failed_to_send,omitempty"`
	// The total number of RPCs that finished and are known to have been received
	// by a server.
	NumCallsFinishedKnownReceived int64 `protobuf:"varint,7,opt,name=num_calls_finished_known_received,json=numCallsFinishedKnownReceived" json:"num_calls_finished_known_received,omitempty"`
}

func (m *ClientStats) Reset()                    { *m = ClientStats{} }
func (m *ClientStats) String() string            { return proto.CompactTextString(m) }
func (*ClientStats) ProtoMessage()               {}
func (*ClientStats) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{4} }

func (m *ClientStats) GetTimestamp() *Timestamp {
	if m != nil {
		return m.Timestamp
	}
	return nil
}

func (m *ClientStats) GetNumCallsStarted() int64 {
	if m != nil {
		return m.NumCallsStarted
	}
	return 0
}

func (m *ClientStats) GetNumCallsFinished() int64 {
	if m != nil {
		return m.NumCallsFinished
	}
	return 0
}

func (m *ClientStats) GetNumCallsFinishedWithDropForRateLimiting() int64 {
	if m != nil {
		return m.NumCallsFinishedWithDropForRateLimiting
	}
	return 0
}

func (m *ClientStats) GetNumCallsFinishedWithDropForLoadBalancing() int64 {
	if m != nil {
		return m.NumCallsFinishedWithDropForLoadBalancing
	}
	return 0
}

func (m *ClientStats) GetNumCallsFinishedWithClientFailedToSend() int64 {
	if m != nil {
		return m.NumCallsFinishedWithClientFailedToSend
	}
	return 0
}

func (m *ClientStats) GetNumCallsFinishedKnownReceived() int64 {
	if m != nil {
		return m.NumCallsFinishedKnownReceived
	}
	return 0
}

type LoadBalanceResponse struct {
	// Types that are valid to be assigned to LoadBalanceResponseType:
	//	*LoadBalanceResponse_InitialResponse
	//	*LoadBalanceResponse_ServerList
	LoadBalanceResponseType isLoadBalanceResponse_LoadBalanceResponseType `protobuf_oneof:"load_balance_response_type"`
}

func (m *LoadBalanceResponse) Reset()                    { *m = LoadBalanceResponse{} }
func (m *LoadBalanceResponse) String() string            { return proto.CompactTextString(m) }
func (*LoadBalanceResponse) ProtoMessage()               {}
func (*LoadBalanceResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{5} }

type isLoadBalanceResponse_LoadBalanceResponseType interface {
	isLoadBalanceResponse_LoadBalanceResponseType()
}

type LoadBalanceResponse_InitialResponse struct {
	InitialResponse *InitialLoadBalanceResponse `protobuf:"bytes,1,opt,name=initial_response,json=initialResponse,oneof"`
}
type LoadBalanceResponse_ServerList struct {
	ServerList *ServerList `protobuf:"bytes,2,opt,name=server_list,json=serverList,oneof"`
}

func (*LoadBalanceResponse_InitialResponse) isLoadBalanceResponse_LoadBalanceResponseType() {}
func (*LoadBalanceResponse_ServerList) isLoadBalanceResponse_LoadBalanceResponseType()      {}

func (m *LoadBalanceResponse) GetLoadBalanceResponseType() isLoadBalanceResponse_LoadBalanceResponseType {
	if m != nil {
		return m.LoadBalanceResponseType
	}
	return nil
}

func (m *LoadBalanceResponse) GetInitialResponse() *InitialLoadBalanceResponse {
	if x, ok := m.GetLoadBalanceResponseType().(*LoadBalanceResponse_InitialResponse); ok {
		return x.InitialResponse
	}
	return nil
}

func (m *LoadBalanceResponse) GetServerList() *ServerList {
	if x, ok := m.GetLoadBalanceResponseType().(*LoadBalanceResponse_ServerList); ok {
		return x.ServerList
	}
	return nil
}

// XXX_OneofFuncs is for the internal use of the proto package.
func (*LoadBalanceResponse) XXX_OneofFuncs() (func(msg proto.Message, b *proto.Buffer) error, func(msg proto.Message, tag, wire int, b *proto.Buffer) (bool, error), func(msg proto.Message) (n int), []interface{}) {
	return _LoadBalanceResponse_OneofMarshaler, _LoadBalanceResponse_OneofUnmarshaler, _LoadBalanceResponse_OneofSizer, []interface{}{
		(*LoadBalanceResponse_InitialResponse)(nil),
		(*LoadBalanceResponse_ServerList)(nil),
	}
}

func _LoadBalanceResponse_OneofMarshaler(msg proto.Message, b *proto.Buffer) error {
	m := msg.(*LoadBalanceResponse)
	// load_balance_response_type
	switch x := m.LoadBalanceResponseType.(type) {
	case *LoadBalanceResponse_InitialResponse:
		b.EncodeVarint(1<<3 | proto.WireBytes)
		if err := b.EncodeMessage(x.InitialResponse); err != nil {
			return err
		}
	case *LoadBalanceResponse_ServerList:
		b.EncodeVarint(2<<3 | proto.WireBytes)
		if err := b.EncodeMessage(x.ServerList); err != nil {
			return err
		}
	case nil:
	default:
		return fmt.Errorf("LoadBalanceResponse.LoadBalanceResponseType has unexpected type %T", x)
	}
	return nil
}

func _LoadBalanceResponse_OneofUnmarshaler(msg proto.Message, tag, wire int, b *proto.Buffer) (bool, error) {
	m := msg.(*LoadBalanceResponse)
	switch tag {
	case 1: // load_balance_response_type.initial_response
		if wire != proto.WireBytes {
			return true, proto.ErrInternalBadWireType
		}
		msg := new(InitialLoadBalanceResponse)
		err := b.DecodeMessage(msg)
		m.LoadBalanceResponseType = &LoadBalanceResponse_InitialResponse{msg}
		return true, err
	case 2: // load_balance_response_type.server_list
		if wire != proto.WireBytes {
			return true, proto.ErrInternalBadWireType
		}
		msg := new(ServerList)
		err := b.DecodeMessage(msg)
		m.LoadBalanceResponseType = &LoadBalanceResponse_ServerList{msg}
		return true, err
	default:
		return false, nil
	}
}

func _LoadBalanceResponse_OneofSizer(msg proto.Message) (n int) {
	m := msg.(*LoadBalanceResponse)
	// load_balance_response_type
	switch x := m.LoadBalanceResponseType.(type) {
	case *LoadBalanceResponse_InitialResponse:
		s := proto.Size(x.InitialResponse)
		n += proto.SizeVarint(1<<3 | proto.WireBytes)
		n += proto.SizeVarint(uint64(s))
		n += s
	case *LoadBalanceResponse_ServerList:
		s := proto.Size(x.ServerList)
		n += proto.SizeVarint(2<<3 | proto.WireBytes)
		n += proto.SizeVarint(uint64(s))
		n += s
	case nil:
	default:
		panic(fmt.Sprintf("proto: unexpected type %T in oneof", x))
	}
	return n
}

type InitialLoadBalanceResponse struct {
	// This is an application layer redirect that indicates the client should use
	// the specified server for load balancing. When this field is non-empty in
	// the response, the client should open a separate connection to the
	// load_balancer_delegate and call the BalanceLoad method. Its length should
	// be less than 64 bytes.
	LoadBalancerDelegate string `protobuf:"bytes,1,opt,name=load_balancer_delegate,json=loadBalancerDelegate" json:"load_balancer_delegate,omitempty"`
	// This interval defines how often the client should send the client stats
	// to the load balancer. Stats should only be reported when the duration is
	// positive.
	ClientStatsReportInterval *Duration `protobuf:"bytes,2,opt,name=client_stats_report_interval,json=clientStatsReportInterval" json:"client_stats_report_interval,omitempty"`
}

func (m *InitialLoadBalanceResponse) Reset()                    { *m = InitialLoadBalanceResponse{} }
func (m *InitialLoadBalanceResponse) String() string            { return proto.CompactTextString(m) }
func (*InitialLoadBalanceResponse) ProtoMessage()               {}
func (*InitialLoadBalanceResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{6} }

func (m *InitialLoadBalanceResponse) GetLoadBalancerDelegate() string {
	if m != nil {
		return m.LoadBalancerDelegate
	}
	return ""
}

func (m *InitialLoadBalanceResponse) GetClientStatsReportInterval() *Duration {
	if m != nil {
		return m.ClientStatsReportInterval
	}
	return nil
}

type ServerList struct {
	// Contains a list of servers selected by the load balancer. The list will
	// be updated when server resolutions change or as needed to balance load
	// across more servers. The client should consume the server list in order
	// unless instructed otherwise via the client_config.
	Servers []*Server `protobuf:"bytes,1,rep,name=servers" json:"servers,omitempty"`
	// Indicates the amount of time that the client should consider this server
	// list as valid. It may be considered stale after waiting this interval of
	// time after receiving the list. If the interval is not positive, the
	// client can assume the list is valid until the next list is received.
	ExpirationInterval *Duration `protobuf:"bytes,3,opt,name=expiration_interval,json=expirationInterval" json:"expiration_interval,omitempty"`
}

func (m *ServerList) Reset()                    { *m = ServerList{} }
func (m *ServerList) String() string            { return proto.CompactTextString(m) }
func (*ServerList) ProtoMessage()               {}
func (*ServerList) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{7} }

func (m *ServerList) GetServers() []*Server {
	if m != nil {
		return m.Servers
	}
	return nil
}

func (m *ServerList) GetExpirationInterval() *Duration {
	if m != nil {
		return m.ExpirationInterval
	}
	return nil
}

// Contains server information. When none of the [drop_for_*] fields are true,
// use the other fields. When drop_for_rate_limiting is true, ignore all other
// fields. Use drop_for_load_balancing only when it is true and
// drop_for_rate_limiting is false.
type Server struct {
	// A resolved address for the server, serialized in network-byte-order. It may
	// either be an IPv4 or IPv6 address.
	IpAddress []byte `protobuf:"bytes,1,opt,name=ip_address,json=ipAddress,proto3" json:"ip_address,omitempty"`
	// A resolved port number for the server.
	Port int32 `protobuf:"varint,2,opt,name=port" json:"port,omitempty"`
	// An opaque but printable token given to the frontend for each pick. All
	// frontend requests for that pick must include the token in its initial
	// metadata. The token is used by the backend to verify the request and to
	// allow the backend to report load to the gRPC LB system.
	//
	// Its length is variable but less than 50 bytes.
	LoadBalanceToken string `protobuf:"bytes,3,opt,name=load_balance_token,json=loadBalanceToken" json:"load_balance_token,omitempty"`
	// Indicates whether this particular request should be dropped by the client
	// for rate limiting.
	DropForRateLimiting bool `protobuf:"varint,4,opt,name=drop_for_rate_limiting,json=dropForRateLimiting" json:"drop_for_rate_limiting,omitempty"`
	// Indicates whether this particular request should be dropped by the client
	// for load balancing.
	DropForLoadBalancing bool `protobuf:"varint,5,opt,name=drop_for_load_balancing,json=dropForLoadBalancing" json:"drop_for_load_balancing,omitempty"`
}

func (m *Server) Reset()                    { *m = Server{} }
func (m *Server) String() string            { return proto.CompactTextString(m) }
func (*Server) ProtoMessage()               {}
func (*Server) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{8} }

func (m *Server) GetIpAddress() []byte {
	if m != nil {
		return m.IpAddress
	}
	return nil
}

func (m *Server) GetPort() int32 {
	if m != nil {
		return m.Port
	}
	return 0
}

func (m *Server) GetLoadBalanceToken() string {
	if m != nil {
		return m.LoadBalanceToken
	}
	return ""
}

func (m *Server) GetDropForRateLimiting() bool {
	if m != nil {
		return m.DropForRateLimiting
	}
	return false
}

func (m *Server) GetDropForLoadBalancing() bool {
	if m != nil {
		return m.DropForLoadBalancing
	}
	return false
}

func init() {
	proto.RegisterType((*Duration)(nil), "grpc.lb.v1.Duration")
	proto.RegisterType((*Timestamp)(nil), "grpc.lb.v1.Timestamp")
	proto.RegisterType((*LoadBalanceRequest)(nil), "grpc.lb.v1.LoadBalanceRequest")
	proto.RegisterType((*InitialLoadBalanceRequest)(nil), "grpc.lb.v1.InitialLoadBalanceRequest")
	proto.RegisterType((*ClientStats)(nil), "grpc.lb.v1.ClientStats")
	proto.RegisterType((*LoadBalanceResponse)(nil), "grpc.lb.v1.LoadBalanceResponse")
	proto.RegisterType((*InitialLoadBalanceResponse)(nil), "grpc.lb.v1.InitialLoadBalanceResponse")
	proto.RegisterType((*ServerList)(nil), "grpc.lb.v1.ServerList")
	proto.RegisterType((*Server)(nil), "grpc.lb.v1.Server")
}

func init() { proto.RegisterFile("grpclb.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 733 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x55, 0xdd, 0x4e, 0x1b, 0x39,
	0x14, 0x66, 0x36, 0xfc, 0xe5, 0x24, 0x5a, 0x58, 0x93, 0x85, 0xc0, 0xc2, 0x2e, 0x1b, 0xa9, 0x34,
	0xaa, 0x68, 0x68, 0x43, 0x7b, 0xd1, 0x9f, 0x9b, 0x02, 0x45, 0x41, 0xe5, 0xa2, 0x72, 0xa8, 0x7a,
	0x55, 0x59, 0x4e, 0xc6, 0x80, 0xc5, 0xc4, 0x9e, 0xda, 0x4e, 0x68, 0x2f, 0x7b, 0xd9, 0x47, 0xe9,
	0x63, 0x54, 0x7d, 0x86, 0xbe, 0x4f, 0x65, 0x7b, 0x26, 0x33, 0x90, 0x1f, 0xd4, 0xbb, 0xf1, 0xf1,
	0x77, 0xbe, 0xf3, 0xf9, 0xd8, 0xdf, 0x19, 0x28, 0x5f, 0xa8, 0xb8, 0x1b, 0x75, 0x1a, 0xb1, 0x92,
	0x46, 0x22, 0xb0, 0xab, 0x46, 0xd4, 0x69, 0x0c, 0x1e, 0xd7, 0x9e, 0xc3, 0xe2, 0x51, 0x5f, 0x51,
	0xc3, 0xa5, 0x40, 0x55, 0x58, 0xd0, 0xac, 0x2b, 0x45, 0xa8, 0xab, 0xc1, 0x76, 0x50, 0x2f, 0xe0,
	0x74, 0x89, 0x2a, 0x30, 0x27, 0xa8, 0x90, 0xba, 0xfa, 0xc7, 0x76, 0x50, 0x9f, 0xc3, 0x7e, 0x51,
	0x7b, 0x01, 0xc5, 0x33, 0xde, 0x63, 0xda, 0xd0, 0x5e, 0xfc, 0xdb, 0xc9, 0xdf, 0x03, 0x40, 0xa7,
	0x92, 0x86, 0x07, 0x34, 0xa2, 0xa2, 0xcb, 0x30, 0xfb, 0xd8, 0x67, 0xda, 0xa0, 0xb7, 0xb0, 0xc4,
	0x05, 0x37, 0x9c, 0x46, 0x44, 0xf9, 0x90, 0xa3, 0x2b, 0x35, 0xef, 0x35, 0x32, 0xd5, 0x8d, 0x13,
	0x0f, 0x19, 0xcd, 0x6f, 0xcd, 0xe0, 0x3f, 0x93, 0xfc, 0x94, 0xf1, 0x25, 0x94, 0xbb, 0x11, 0x67,
	0xc2, 0x10, 0x6d, 0xa8, 0xf1, 0x2a, 0x4a, 0xcd, 0xb5, 0x3c, 0xdd, 0xa1, 0xdb, 0x6f, 0xdb, 0xed,
	0xd6, 0x0c, 0x2e, 0x75, 0xb3, 0xe5, 0xc1, 0x3f, 0xb0, 0x1e, 0x49, 0x1a, 0x92, 0x8e, 0x2f, 0x93,
	0x8a, 0x22, 0xe6, 0x73, 0xcc, 0x6a, 0x7b, 0xb0, 0x3e, 0x51, 0x09, 0x42, 0x30, 0x2b, 0x68, 0x8f,
	0x39, 0xf9, 0x45, 0xec, 0xbe, 0x6b, 0x5f, 0x67, 0xa1, 0x94, 0x2b, 0x86, 0xf6, 0xa1, 0x68, 0xd2,
	0x0e, 0x26, 0xe7, 0xfc, 0x3b, 0x2f, 0x6c, 0xd8, 0x5e, 0x9c, 0xe1, 0xd0, 0x03, 0xf8, 0x4b, 0xf4,
	0x7b, 0xa4, 0x4b, 0xa3, 0x48, 0xdb, 0x33, 0x29, 0xc3, 0x42, 0x77, 0xaa, 0x02, 0x5e, 0x12, 0xfd,
	0xde, 0xa1, 0x8d, 0xb7, 0x7d, 0x18, 0xed, 0x02, 0xca, 0xb0, 0xe7, 0x5c, 0x70, 0x7d, 0xc9, 0xc2,
	0x6a, 0xc1, 0x81, 0x97, 0x53, 0xf0, 0x71, 0x12, 0x47, 0x04, 0x1a, 0xa3, 0x68, 0x72, 0xcd, 0xcd,
	0x25, 0x09, 0x95, 0x8c, 0xc9, 0xb9, 0x54, 0x44, 0x51, 0xc3, 0x48, 0xc4, 0x7b, 0xdc, 0x70, 0x71,
	0x51, 0x9d, 0x75, 0x4c, 0xf7, 0x6f, 0x33, 0xbd, 0xe7, 0xe6, 0xf2, 0x48, 0xc9, 0xf8, 0x58, 0x2a,
	0x4c, 0x0d, 0x3b, 0x4d, 0xe0, 0x88, 0xc2, 0xde, 0x9d, 0x05, 0x72, 0xed, 0xb6, 0x15, 0xe6, 0x5c,
	0x85, 0xfa, 0x94, 0x0a, 0x59, 0xef, 0x6d, 0x89, 0x0f, 0xf0, 0x70, 0x52, 0x89, 0xe4, 0x19, 0x9c,
	0x53, 0x1e, 0xb1, 0x90, 0x18, 0x49, 0x34, 0x13, 0x61, 0x75, 0xde, 0x15, 0xd8, 0x19, 0x57, 0xc0,
	0x5f, 0xd5, 0xb1, 0xc3, 0x9f, 0xc9, 0x36, 0x13, 0x21, 0x6a, 0xc1, 0xff, 0x63, 0xe8, 0xaf, 0x84,
	0xbc, 0x16, 0x44, 0xb1, 0x2e, 0xe3, 0x03, 0x16, 0x56, 0x17, 0x1c, 0xe5, 0xd6, 0x6d, 0xca, 0x37,
	0x16, 0x85, 0x13, 0x50, 0xed, 0x47, 0x00, 0x2b, 0x37, 0x9e, 0x8d, 0x8e, 0xa5, 0xd0, 0x0c, 0xb5,
	0x61, 0x39, 0x73, 0x80, 0x8f, 0x25, 0x4f, 0x63, 0xe7, 0x2e, 0x0b, 0x78, 0x74, 0x6b, 0x06, 0x2f,
	0x0d, 0x3d, 0x90, 0x90, 0x3e, 0x83, 0x92, 0x66, 0x6a, 0xc0, 0x14, 0x89, 0xb8, 0x36, 0x89, 0x07,
	0x56, 0xf3, 0x7c, 0x6d, 0xb7, 0x7d, 0xca, 0x9d, 0x87, 0x40, 0x0f, 0x57, 0x07, 0x9b, 0xb0, 0x71,
	0xcb, 0x01, 0x9e, 0xd3, 0x5b, 0xe0, 0x5b, 0x00, 0x1b, 0x93, 0xa5, 0xa0, 0x27, 0xb0, 0x9a, 0x4f,
	0x56, 0x24, 0x64, 0x11, 0xbb, 0xa0, 0x26, 0xb5, 0x45, 0x25, 0xca, 0x92, 0xd4, 0x51, 0xb2, 0x87,
	0xde, 0xc1, 0x66, 0xde, 0xb2, 0x44, 0xb1, 0x58, 0x2a, 0x43, 0xb8, 0x30, 0x4c, 0x0d, 0x68, 0x94,
	0xc8, 0xaf, 0xe4, 0xe5, 0xa7, 0x43, 0x0c, 0xaf, 0xe7, 0xdc, 0x8b, 0x5d, 0xde, 0x49, 0x92, 0x56,
	0xfb, 0x12, 0x00, 0x64, 0xc7, 0x44, 0xbb, 0x76, 0x62, 0xd9, 0x95, 0x9d, 0x58, 0x85, 0x7a, 0xa9,
	0x89, 0x46, 0xfb, 0x81, 0x53, 0x08, 0x7a, 0x0d, 0x2b, 0xec, 0x53, 0xcc, 0x7d, 0x95, 0x4c, 0x4a,
	0x61, 0x8a, 0x14, 0x94, 0x25, 0x0c, 0x35, 0xfc, 0x0c, 0x60, 0xde, 0x53, 0xa3, 0x2d, 0x00, 0x1e,
	0x13, 0x1a, 0x86, 0x8a, 0x69, 0x3f, 0x34, 0xcb, 0xb8, 0xc8, 0xe3, 0x57, 0x3e, 0x60, 0xe7, 0x87,
	0x55, 0x9f, 0x4c, 0x4d, 0xf7, 0x6d, 0xed, 0x7c, 0xe3, 0x2e, 0x8c, 0xbc, 0x62, 0xc2, 0x69, 0x28,
	0xe2, 0xe5, 0x5c, 0x2b, 0xcf, 0x6c, 0x1c, 0xed, 0xc3, 0xea, 0x14, 0xdb, 0x2e, 0xe2, 0x95, 0x70,
	0x8c, 0x45, 0x9f, 0xc2, 0xda, 0x34, 0x2b, 0x2e, 0xe2, 0x4a, 0x38, 0xc6, 0x76, 0xcd, 0x0e, 0x94,
	0x73, 0xf7, 0xaf, 0x10, 0x86, 0x52, 0xf2, 0x6d, 0xc3, 0xe8, 0xdf, 0x7c, 0x83, 0x46, 0x87, 0xe5,
	0xc6, 0x7f, 0x13, 0xf7, 0xfd, 0x43, 0xaa, 0x07, 0x8f, 0x82, 0xce, 0xbc, 0xfb, 0x7d, 0xed, 0xff,
	0x0a, 0x00, 0x00, 0xff, 0xff, 0x64, 0xbf, 0xda, 0x5e, 0xce, 0x06, 0x00, 0x00,
}
