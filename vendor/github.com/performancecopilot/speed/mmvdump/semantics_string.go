// Code generated by "stringer -type=Semantics"; DO NOT EDIT

package mmvdump

import "fmt"

const _Semantics_name = "NoSemantics"

var _Semantics_index = [...]uint8{0, 11}

func (i Semantics) String() string {
	if i < 0 || i >= Semantics(len(_Semantics_index)-1) {
		return fmt.Sprintf("Semantics(%d)", i)
	}
	return _Semantics_name[_Semantics_index[i]:_Semantics_index[i+1]]
}
